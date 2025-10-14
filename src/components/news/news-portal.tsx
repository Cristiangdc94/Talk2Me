
'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NewsArticleCard } from './news-article-card';
import { newsArticles } from '@/lib/mock-data';
import type { NewsArticle } from '@/lib/types';
import { Button } from '../ui/button';
import { Settings } from 'lucide-react';
import { NewsPreferencesDialog } from './news-preferences-dialog';
import { Skeleton } from '../ui/skeleton';

export function NewsPortal() {
  const [location, setLocation] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

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
  }, []);

  const handleSavePreferences = (newPrefs: string[]) => {
    setPreferences(newPrefs);
    Cookies.set('news-preferences', JSON.stringify(newPrefs), { expires: 365 });
    setDialogOpen(false);
  };

  const generalNews = newsArticles.filter(
    (article) => article.location === location || article.location === 'global'
  );

  const personalizedNews = newsArticles.filter((article) =>
    preferences.includes(article.category)
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
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
      <Tabs defaultValue="general">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="general">Noticias Generales</TabsTrigger>
            <TabsTrigger value="personalizadas">Para Ti</TabsTrigger>
          </TabsList>
          <Button variant="ghost" size="icon" onClick={() => setDialogOpen(true)}>
            <Settings className="h-5 w-5" />
            <span className="sr-only">Configurar noticias</span>
          </Button>
        </div>
        <TabsContent value="general">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {generalNews.map((article) => (
              <NewsArticleCard key={article.id} article={article} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="personalizadas">
          {personalizedNews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {personalizedNews.map((article) => (
                <NewsArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <Card className="col-span-full flex flex-col items-center justify-center p-8 text-center">
              <CardHeader>
                <CardTitle>Personaliza tu feed de noticias</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Selecciona tus intereses para ver noticias personalizadas aquí.
                </p>
                <Button onClick={() => setDialogOpen(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Elegir Intereses
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
