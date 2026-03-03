
'use client';

import { useState, useEffect, useTransition, useRef, useCallback } from 'react';
import { NewsArticleCard } from './news-article-card';
import { friendStatuses as initialFriendStatuses, users } from '@/lib/mock-data';
import type { NewsArticle, FriendStatus } from '@/lib/types';
import { Button } from '../ui/button';
import { RefreshCw, Globe, Settings, Loader2 } from 'lucide-react';
import { NewsPreferencesDialog } from './news-preferences-dialog';
import { Skeleton } from '../ui/skeleton';
import { useNewsPreferences } from '@/hooks/use-news-preferences';
import { fetchRealNews } from '@/lib/news-service';
import { FriendStatusCard } from './friend-status-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useToast } from '@/hooks/use-toast';
import { CompanyNewsPortal } from './company-news-portal';
import Autoplay from "embla-carousel-autoplay";
import { AddStatusCard } from './add-status-card';

interface NewsPortalProps {
  view: 'general' | 'foryou' | 'company';
}

export function NewsPortal({ view }: NewsPortalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { preferences, setPreferences, isDialogOpen, setDialogOpen } = useNewsPreferences();
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, startRefreshing] = useTransition();
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [friendStatuses, setFriendStatuses] = useState<FriendStatus[]>(initialFriendStatuses);
  const { toast } = useToast();
  const currentUser = users.find(u => u.id === '1');

  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const loadNews = useCallback(async () => {
    if (view === 'company') {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const news = await fetchRealNews();
      setAllNews(news);
    } catch (error) {
      console.error("Error cargando noticias:", error);
    } finally {
      setLoading(false);
    }
  }, [view]);

  useEffect(() => {
    setIsMounted(true);
    loadNews();
  }, [loadNews]);

  const handleRefresh = () => {
    startRefreshing(async () => {
      const news = await fetchRealNews();
      if (news.length > 0) {
        setAllNews(news);
        toast({
          title: "Noticias actualizadas",
          description: "Se han cargado las últimas noticias internacionales.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error al actualizar",
          description: "No se pudieron obtener nuevas noticias. Revisa tu conexión.",
        });
      }
    });
  };

  const handleSavePreferences = (newPrefs: string[]) => {
    setPreferences(newPrefs);
    setDialogOpen(false);
  };
  
  const handleAddStatus = (statusText: string) => {
    if (!currentUser) return;
    const newStatus: FriendStatus = {
      id: `status-${Date.now()}`,
      user: currentUser,
      statusText,
      timestamp: 'justo ahora',
    };
    setFriendStatuses(prev => [newStatus, ...prev]);
    toast({
        title: "Estado Publicado",
        description: "Tus amigos ahora pueden ver tu nueva actualización.",
    });
  };

  if (!isMounted || !currentUser) return null;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <Skeleton key={i} className="h-80 w-full" />)}
        </div>
      );
    }

    if (view === 'company') {
      return <CompanyNewsPortal />;
    }

    const filteredNews = view === 'foryou' && preferences.length > 0 
      ? allNews.filter(n => preferences.includes(n.category)) 
      : allNews;

    return (
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold tracking-tight">
              {view === 'foryou' ? 'Noticias Para Ti' : 'Noticias Internacionales'}
            </h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing || isLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
            <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Preferencias
            </Button>
          </div>
        </div>
        
        {filteredNews.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredNews.map((article) => (
              <NewsArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-lg bg-background/40">
            {allNews.length === 0 ? (
              <>
                <p className="text-muted-foreground">No se pudieron cargar noticias internacionales.</p>
                <Button variant="link" onClick={loadNews} className="mt-2">Reintentar</Button>
              </>
            ) : (
              <p className="text-muted-foreground">No hay noticias que coincidan con tus preferencias actuales.</p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <NewsPreferencesDialog
        isOpen={isDialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSavePreferences}
        currentPreferences={preferences}
      />
      <div className='flex flex-col gap-8 pb-20'>
        <div className="bg-muted/50 rounded-lg p-4">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">Lo nuevo entre tus amigos</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <AddStatusCard currentUser={currentUser} onAddStatus={handleAddStatus} />
              </div>
              <div className="md:col-span-3 h-full">
                 {friendStatuses.length > 0 ? (
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[autoplayPlugin.current]}
                        className="w-full"
                        onMouseEnter={() => autoplayPlugin.current.stop()}
                        onMouseLeave={() => autoplayPlugin.current.play()}
                    >
                        <CarouselContent>
                            {friendStatuses.map((status) => (
                                <CarouselItem key={status.id} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1 h-full">
                                        <FriendStatusCard status={status} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-4" />
                        <CarouselNext className="-right-4" />
                    </Carousel>
                 ) : (
                    <div className="h-full flex items-center justify-center border rounded-lg bg-background/20 p-8 text-muted-foreground">
                        No hay estados recientes.
                    </div>
                 )}
              </div>
            </div>
        </div>

        {renderContent()}
      </div>
    </>
  );
}
