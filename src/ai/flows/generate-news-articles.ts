'use server';

/**
 * @fileOverview An AI agent that generates fictional news articles.
 *
 * - generateNewsArticles - A function that handles the news article generation process.
 * - GenerateNewsArticlesInput - The input type for the generateNewsArticles function.
 * - GenerateNewsArticlesOutput - The return type for the generateNewsArticles function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ArticleSchema = z.object({
  category: z.enum(['technology', 'business', 'sports', 'health', 'entertainment']).describe('La categoría del artículo de noticias.'),
  title: z.string().describe('El titular del artículo de noticias.'),
  summary: z.string().describe('Un breve resumen del artículo de noticias.'),
  location: z.enum(['local', 'global']).describe('El alcance geográfico de la noticia.'),
  link: z.string().url().describe('Un enlace ficticio a la noticia completa.'),
  imageUrl: z.string().url().describe('Una URL de imagen de marcador de posición ficticia.'),
});

const GenerateNewsArticlesInputSchema = z.object({
  existingTopics: z.array(z.string()).describe('Una lista de temas de noticias existentes para evitar la duplicación.'),
  categories: z.array(z.enum(['technology', 'business', 'sports', 'health', 'entertainment'])).describe('Las categorías de noticias para generar.'),
});
export type GenerateNewsArticlesInput = z.infer<typeof GenerateNewsArticlesInputSchema>;

const GenerateNewsArticlesOutputSchema = z.object({
  articles: z.array(ArticleSchema).length(3).describe('Un array de 3 artículos de noticias generados.'),
});
export type GenerateNewsArticlesOutput = z.infer<typeof GenerateNewsArticlesOutputSchema>;

export async function generateNewsArticles(input: GenerateNewsArticlesInput): Promise<GenerateNewsArticlesOutput> {
  return generateNewsArticlesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNewsArticlesPrompt',
  input: { schema: GenerateNewsArticlesInputSchema },
  output: { schema: GenerateNewsArticlesOutputSchema },
  prompt: `Eres un generador de noticias de IA. Tu tarea es crear 3 artículos de noticias ficticios pero plausibles basados en las categorías proporcionadas.

  Asegúrate de que los temas no se parezcan demasiado a los siguientes temas existentes:
  {{#each existingTopics}}
  - {{{this}}}
  {{/each}}

  Genera artículos para estas categorías:
  {{#each categories}}
  - {{{this}}}
  {{/each}}
  
  Para cada artículo, proporciona una categoría, un titular, un breve resumen, una ubicación ('local' o 'global'), una URL de enlace ficticia (p. ej., '#') y una URL de imagen de marcador de posición de picsum.photos.

  Formatea tu salida como un array JSON de 3 objetos de artículo.
  `,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const generateNewsArticlesFlow = ai.defineFlow(
  {
    name: 'generateNewsArticlesFlow',
    inputSchema: GenerateNewsArticlesInputSchema,
    outputSchema: GenerateNewsArticlesOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
