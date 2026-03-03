'use server';

/**
 * @fileOverview Agente de IA para ayudar a los usuarios con Talk2Me.
 *
 * - helpChatbot - Función que maneja la lógica del chat de ayuda.
 * - HelpChatbotInput - Esquema de entrada para el chatbot.
 * - HelpChatbotOutput - Esquema de salida para el chatbot.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const HelpChatbotInputSchema = z.object({
  message: z.string().describe('El mensaje actual del usuario.'),
  history: z.array(MessageSchema).optional().describe('El historial previo de la conversación.'),
});
export type HelpChatbotInput = z.infer<typeof HelpChatbotInputSchema>;

const HelpChatbotOutputSchema = z.object({
  text: z.string().describe('La respuesta de la IA.'),
});
export type HelpChatbotOutput = z.infer<typeof HelpChatbotOutputSchema>;

export async function helpChatbot(input: HelpChatbotInput): Promise<HelpChatbotOutput> {
  return helpChatbotFlow(input);
}

const helpChatbotFlow = ai.defineFlow(
  {
    name: 'helpChatbotFlow',
    inputSchema: HelpChatbotInputSchema,
    outputSchema: HelpChatbotOutputSchema,
  },
  async (input) => {
    const { text } = await ai.generate({
      system: `Eres el asistente de ayuda oficial de Talk2Me. 
      Talk2Me es una plataforma de comunicación en tiempo real que ofrece:
      - Canales públicos (#general, #varios) y privados (#equipo-diseño).
      - Mensajes directos con amigos y compañeros.
      - Un portal de noticias con secciones: General, Empresa (noticias corporativas) y Para Ti (personalizado).
      - Perfiles de usuario personalizables con gustos y descripción.
      - Un widget de notificaciones en la parte inferior derecha.
      - Ajustes de cuenta, voz y video.
      
      Tu objetivo es ayudar a los usuarios a navegar por la app, explicar cómo funcionan las secciones y resolver dudas técnicas simples de forma amable y concisa.`,
      messages: [
        ...(input.history || []).map((h) => ({
          role: h.role,
          content: [{ text: h.content }],
        })),
        { role: 'user', content: [{ text: input.message }] },
      ],
    });

    return { text: text || 'Lo siento, no he podido procesar tu solicitud. ¿En qué más puedo ayudarte?' };
  }
);
