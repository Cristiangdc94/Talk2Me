'use server';
/**
 * @fileOverview An AI agent that generates a company logo.
 *
 * - generateCompanyLogo - A function that handles the logo generation process.
 * - GenerateCompanyLogoInput - The input type for the generateCompanyLogo function.
 * - GenerateCompanyLogoOutput - The return type for the generateCompanyLogo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCompanyLogoInputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
});
export type GenerateCompanyLogoInput = z.infer<
  typeof GenerateCompanyLogoInputSchema
>;

const GenerateCompanyLogoOutputSchema = z.object({
  logoDataUri: z
    .string()
    .describe('The generated logo as a data URI.'),
});
export type GenerateCompanyLogoOutput = z.infer<
  typeof GenerateCompanyLogoOutputSchema
>;

export async function generateCompanyLogo(
  input: GenerateCompanyLogoInput
): Promise<GenerateCompanyLogoOutput> {
  return generateCompanyLogoFlow(input);
}

const prompt = `Generate a simple, modern, flat, vector-style logo for a company named '{{companyName}}'. The logo should be on a clean, solid background. Do not include any text in the logo.`;

const generateCompanyLogoFlow = ai.defineFlow(
  {
    name: 'generateCompanyLogoFlow',
    inputSchema: GenerateCompanyLogoInputSchema,
    outputSchema: GenerateCompanyLogoOutputSchema,
  },
  async ({ companyName }) => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: prompt.replace('{{companyName}}', companyName),
    });

    return { logoDataUri: media.url };
  }
);
