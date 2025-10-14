
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { NewsArticle } from '@/lib/types';

interface NewsArticleCardProps {
  article: NewsArticle;
}

export function NewsArticleCard({ article }: NewsArticleCardProps) {
  const categoryText = {
    technology: 'Tecnología',
    business: 'Negocios',
    sports: 'Deportes',
    health: 'Salud',
    entertainment: 'Entretenimiento',
  };

  return (
    <Link href={article.link} target="_blank" rel="noopener noreferrer">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 bg-card">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint="news article"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-bold leading-snug mb-2">{article.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{article.summary}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground">
          <Badge variant="secondary">{categoryText[article.category]}</Badge>
          <span>{article.timestamp}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
