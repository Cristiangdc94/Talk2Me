
'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { users, companyNews } from '@/lib/mock-data';
import { CompanyNewsArticle } from '@/lib/types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Building2 } from 'lucide-react';
import { Badge } from '../ui/badge';

function CompanyNewsCard({ article }: { article: CompanyNewsArticle }) {
    return (
        <Link href={article.link} target="_blank" rel="noopener noreferrer">
            <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            data-ai-hint="company news"
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    <CardTitle className="text-lg font-bold leading-snug mb-2">{article.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{article.summary}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <Badge variant="outline">{article.companyName}</Badge>
                    <p className="text-xs text-muted-foreground">{article.timestamp}</p>
                </CardFooter>
            </Card>
        </Link>
    );
}


export function CompanyNewsPortal() {
    const currentUser = users.find(u => u.id === '1');

    const relevantNews = useMemo(() => {
        if (!currentUser?.companyRoles) {
            return [];
        }
        const userCompanies = Object.keys(currentUser.companyRoles);
        return companyNews
            .filter(article => userCompanies.includes(article.companyName))
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); // Assuming timestamp can be parsed
    }, [currentUser]);

    if (relevantNews.length === 0) {
        return null; // Don't render the section if there's no news
    }

    return (
        <div className="bg-muted/50 rounded-lg p-4">
            <h2 className="text-2xl font-semibold tracking-tight mb-3 flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                Noticias de la Empresa
            </h2>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {relevantNews.map((article) => (
                        <CarouselItem key={article.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <div className="p-1 h-full">
                                <CompanyNewsCard article={article} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
            </Carousel>
        </div>
    );
}
