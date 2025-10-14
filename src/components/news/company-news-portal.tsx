
'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { users, companyNews } from '@/lib/mock-data';
import { CompanyNewsArticle } from '@/lib/types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Building2, Heart } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from '@/lib/utils';

function CompanyNewsCard({ article, currentUserId }: { article: CompanyNewsArticle, currentUserId: string }) {
    const [likes, setLikes] = useState(article.likes || []);
    const isLiked = likes.includes(currentUserId);

    const handleLike = () => {
        setLikes(prevLikes => 
            isLiked 
                ? prevLikes.filter(id => id !== currentUserId)
                : [...prevLikes, currentUserId]
        );
    };

    const likerNames = likes
        .map(likeId => users.find(u => u.id === likeId)?.name)
        .filter(Boolean) // Filter out undefined names
        .join(', ');

    return (
        <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col">
            <CardHeader className="p-0">
                 <Link href={article.link} target="_blank" rel="noopener noreferrer" className="block relative h-48 w-full">
                    <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        data-ai-hint="company news"
                    />
                </Link>
            </CardHeader>
            <CardContent className="p-4 flex-1">
                 <Link href={article.link} target="_blank" rel="noopener noreferrer">
                    <CardTitle className="text-lg font-bold leading-snug mb-2 hover:underline">{article.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{article.summary}</p>
                </Link>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <Badge variant="outline">{article.companyName}</Badge>
                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="text-sm font-medium text-muted-foreground cursor-pointer">
                                    {likes.length}
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                {likes.length > 0 ? <p>{likerNames}</p> : <p>Sé el primero en dar me gusta.</p>}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Button variant="ghost" size="icon" onClick={handleLike} className="h-8 w-8">
                        <Heart className={cn("h-5 w-5", isLiked ? "text-red-500 fill-red-500" : "text-muted-foreground")} />
                        <span className="sr-only">Me gusta</span>
                    </Button>
                </div>
            </CardFooter>
        </Card>
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

    if (!currentUser || relevantNews.length === 0) {
        return null; // Don't render the section if there's no news or current user
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
                                <CompanyNewsCard article={article} currentUserId={currentUser.id} />
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
