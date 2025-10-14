'use server';

/**
 * @fileOverview An AI agent that suggests smart replies based on the current conversation.
 *
 * - getSmartReplySuggestions - A function that handles the smart reply suggestion process.
 * - SmartReplySuggestionsInput - The input type for the getSmartReplySuggestions function.
 * - SmartReplySuggestionsOutput - The return type for the getSmartReplySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartReplySuggestionsInputSchema = z.object({
  messageHistory: z.string().describe('El historial reciente de mensajes en la conversación.'),
});
export type SmartReplySuggestionsInput = z.infer<typeof SmartReplySuggestionsInputSchema>;

const SmartReplySuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('Un array de respuestas sugeridas.'),
});
export type SmartReplySuggestionsOutput = z.infer<typeof SmartReplySuggestionsOutputSchema>;

export async function getSmartReplySuggestions(input: SmartReplySuggestionsInput): Promise<SmartReplySuggestionsOutput> {
  return smartReplySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartReplySuggestionsPrompt',
  input: {schema: SmartReplySuggestionsInputSchema},
  output: {schema: SmartReplySuggestionsOutputSchema},
  prompt: `Eres un asistente de IA útil que sugiere respuestas inteligentes basadas en la conversación actual.

  Dado el siguiente historial de mensajes, sugiere tres respuestas cortas que el usuario podría enviar.

  Historial de Mensajes:
  {{messageHistory}}

  Formatea tu salida como un array de strings JSON.
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

const smartReplySuggestionsFlow = ai.defineFlow(
  {
    name: 'smartReplySuggestionsFlow',
    inputSchema: SmartReplySuggestionsInputSchema,
    outputSchema: SmartReplySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
