'use client';

import { useState, useEffect, useTransition } from 'react';
import Cookies from 'js-cookie';
import { NewsArticleCard } from './news-article-card';
import { newsArticles } from '@/lib/mock-data';
import type { NewsArticle } from '@/lib/types';
import { Button } from '../ui/button';
import { Loader2, Settings, PlusCircle } from 'lucide-react';
import { NewsPreferencesDialog } from './news-preferences-dialog';
import { Skeleton } from '../ui/skeleton';
import { useNewsPreferences } from '@/hooks/use-news-preferences';
import { generateNewsArticles } from '@/ai/flows/generate-news-articles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

function LoadMoreNewsCard({ onClick, isGenerating }: { onClick: () => void; isGenerating: boolean }) {
  return (
    <Card
      className="h-full flex flex-col items-center justify-center text-center transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={!isGenerating ? onClick : undefined}
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
          </>
        )}
      </CardContent>
    </Card>
  );
}


export function NewsPortal() {
  const [location, setLocation] = useState<string | null>(null);
  const { preferences, setPreferences, isDialogOpen, setDialogOpen } = useNewsPreferences();
  const [isLoading, setLoading] = useState(true);
  const [isGenerating, startGenerating] = useTransition();
  const [allNews, setAllNews] = useState<NewsArticle[]>(newsArticles);

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

  const handleSavePreferences = (newPrefs: string[]) => {
    setPreferences(newPrefs);
    Cookies.set('news-preferences', JSON.stringify(newPrefs), { expires: 365 });
    setDialogOpen(false);
  };
  
  const handleGenerateMoreNews = () => {
    startGenerating(async () => {
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
    });
  };

  const generalNews = allNews.filter(
    (article) => article.location === location || article.location === 'global'
  );

  const preferredNews = generalNews.filter(
    (article) => preferences.length === 0 || preferences.includes(article.category)
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
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
      <Tabs defaultValue="general" className="h-full flex flex-col">
        <div className="flex items-center justify-center mb-4">
          <TabsList className="p-1.5 bg-card">
            <TabsTrigger value="general" className="text-base px-4 py-2">Noticias Generales</TabsTrigger>
            <TabsTrigger value="foryou" className="text-base px-4 py-2">Para Ti</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="general" className="flex-1">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {generalNews.map((article) => (
              <NewsArticleCard key={article.id} article={article} />
            ))}
            <LoadMoreNewsCard onClick={handleGenerateMoreNews} isGenerating={isGenerating} />
          </div>
        </TabsContent>
        <TabsContent value="foryou" className="flex-1">
           {preferences.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {preferredNews.map((article) => (
                <NewsArticleCard key={article.id} article={article} />
              ))}
              <LoadMoreNewsCard onClick={handleGenerateMoreNews} isGenerating={isGenerating} />
            </div>
           ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 border rounded-lg bg-muted/50">
                <p className="text-lg font-semibold mb-2">Personaliza tu feed de noticias</p>
                <p className="text-muted-foreground mb-4">Selecciona tus categorías favoritas para ver noticias solo para ti.</p>
                <Button onClick={() => setDialogOpen(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Abrir Preferencias
                </Button>
            </div>
           )}
        </TabsContent>
      </Tabs>
    </>
  );
}
