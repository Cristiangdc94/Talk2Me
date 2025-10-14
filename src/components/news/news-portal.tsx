
'use client';

import { useState, useEffect, useTransition, useRef } from 'react';
import Cookies from 'js-cookie';
import { NewsArticleCard } from './news-article-card';
import { friendStatuses as initialFriendStatuses, newsArticles, users } from '@/lib/mock-data';
import type { NewsArticle, FriendStatus } from '@/lib/types';
import { Button } from '../ui/button';
import { Loader2, Settings, PlusCircle } from 'lucide-react';
import { NewsPreferencesDialog } from './news-preferences-dialog';
import { Skeleton } from '../ui/skeleton';
import { useNewsPreferences } from '@/hooks/use-news-preferences';
import { generateNewsArticles } from '@/ai/flows/generate-news-articles';
import { Card, CardContent } from '@/components/ui/card';
import { FriendStatusCard } from './friend-status-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useToast } from '@/hooks/use-toast';
import { CompanyNewsPortal } from './company-news-portal';
import Autoplay from "embla-carousel-autoplay";
import { AddStatusCard } from './add-status-card';

function LoadMoreNewsCard({ onClick, isGenerating, isDisabled }: { onClick: () => void; isGenerating: boolean, isDisabled: boolean }) {
  return (
    <Card
      className="h-full flex flex-col items-center justify-center text-center transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer min-h-[288px] disabled:cursor-not-allowed disabled:opacity-50"
      onClick={!isGenerating && !isDisabled ? onClick : undefined}
      aria-disabled={isGenerating || isDisabled}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center">
        {isGenerating ? (
          <>
            <Loader2 className="h-12 w-12 text-muted-foreground animate-spin" />
            <p className="mt-4 text-muted-foreground">Generando noticias...</p>
          </>
        ) : (
          <>
            <PlusCircle className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 font-semibold">Más noticias</p>
            {isDisabled && <p className="text-xs text-muted-foreground mt-2">Límite de peticiones alcanzado. Inténtalo más tarde.</p>}
          </>
        )}
      </CardContent>
    </Card>
  );
}

interface NewsPortalProps {
  view: 'general' | 'foryou' | 'company';
}

export function NewsPortal({ view }: NewsPortalProps) {
  const [location, setLocation] = useState<string | null>(null);
  const { preferences, setPreferences, isDialogOpen, setDialogOpen } = useNewsPreferences();
  const [isLoading, setLoading] = useState(true);
  const [isGenerating, startGenerating] = useTransition();
  const [allNews, setAllNews] = useState<NewsArticle[]>(newsArticles);
  const [friendStatuses, setFriendStatuses] = useState<FriendStatus[]>(initialFriendStatuses);
  const { toast } = useToast();
  const [isRateLimited, setRateLimited] = useState(false);
  const rateLimitTimer = useRef<NodeJS.Timeout | null>(null);
  const currentUser = users.find(u => u.id === '1');

  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, loop: true })
  );

  useEffect(() => {
    // Fetch location
    navigator.geolocation.getCurrentPosition(
      () => {
        // For this demo, we'll just simulate a "local" location is available
        setLocation('local');
        setLoading(false);
      },
      () => {
        // If user denies, we default to global news
        setLocation('global');
        setLoading(false);
      }
    );

    // Fetch preferences from cookies
    const savedPrefs = Cookies.get('news-preferences');
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    }
  }, [setPreferences]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (rateLimitTimer.current) {
        clearTimeout(rateLimitTimer.current);
      }
    };
  }, []);

  const handleSavePreferences = (newPrefs: string[]) => {
    setPreferences(newPrefs);
    Cookies.set('news-preferences', JSON.stringify(newPrefs), { expires: 365 });
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

  const handleGenerateMoreNews = () => {
    if (isRateLimited) return;

    startGenerating(async () => {
      try {
        const { articles } = await generateNewsArticles({
          existingTopics: allNews.map(a => a.title),
          categories: ['technology', 'business', 'sports', 'health', 'entertainment'],
        });
        // Generate unique IDs for the new articles
        const newArticlesWithIds = articles.map((article, index) => ({
          ...article,
          id: `gen-${Date.now()}-${index}`,
        }));
        setAllNews(prev => [...prev, ...newArticlesWithIds]);
      } catch (error: any) {
        console.error("Error al generar más noticias:", error);
        if (error.message && error.message.includes('429')) {
           toast({
            variant: "destructive",
            title: "Límite de Peticiones Alcanzado",
            description: "Has superado la cuota de la API. Por favor, espera un minuto.",
          });
          setRateLimited(true);
          rateLimitTimer.current = setTimeout(() => {
            setRateLimited(false);
          }, 60000);
        } else {
           toast({
            variant: "destructive",
            title: "Error al Generar Noticias",
            description: "No se pudieron generar más noticias. Inténtalo de nuevo más tarde.",
          });
        }
      }
    });
  };

  const generalNews = allNews.filter(
    (article) => article.location === location || article.location === 'global'
  );

  const preferredNews = generalNews.filter(
    (article) => preferences.length === 0 || preferences.includes(article.category)
  );
  
  const newsToShow = view === 'foryou' ? preferredNews : generalNews;

  if (isLoading || !currentUser) {
    return (
      <div className="space-y-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (view) {
      case 'company':
        return <CompanyNewsPortal />;
      case 'foryou':
        if (preferences.length === 0) {
           return (
            <div className="flex flex-1 flex-col items-center justify-center h-full text-center p-8 border rounded-lg bg-background min-h-[400px]">
                <p className="text-lg font-semibold mb-2">Personaliza tu feed de noticias</p>
                <p className="text-muted-foreground mb-4">Selecciona tus categorías favoritas para ver noticias solo para ti.</p>
                <Button onClick={() => setDialogOpen(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Abrir Preferencias
                </Button>
            </div>
          );
        }
        return (
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Para Tí</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {newsToShow.map((article) => (
                <NewsArticleCard key={article.id} article={article} />
              ))}
              <LoadMoreNewsCard onClick={handleGenerateMoreNews} isGenerating={isGenerating} isDisabled={isRateLimited} />
            </div>
          </div>
        );
      case 'general':
        return (
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Noticias Generales</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {newsToShow.map((article) => (
                <NewsArticleCard key={article.id} article={article} />
              ))}
              <LoadMoreNewsCard onClick={handleGenerateMoreNews} isGenerating={isGenerating} isDisabled={isRateLimited} />
            </div>
          </div>
        );
      default:
        return null;
    }
  }


  return (
    <>
      <NewsPreferencesDialog
        isOpen={isDialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSavePreferences}
        currentPreferences={preferences}
      />
      <div className='flex flex-col gap-8'>
        <div className="bg-muted/50 rounded-lg p-4">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">Lo nuevo entre tus amigos</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <AddStatusCard currentUser={currentUser} onAddStatus={handleAddStatus} />
              </div>
              <div className="md:col-span-3">
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
              </div>
            </div>
        </div>

        {renderContent()}
      </div>
    </>
  );
}
