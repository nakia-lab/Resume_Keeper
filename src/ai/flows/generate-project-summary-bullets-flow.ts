'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate a concise project summary and exactly three impactful bullet points for a resume.
 *
 * - generateProjectSummaryAndBullets - A function that handles the generation process.
 * - GenerateProjectSummaryAndBulletsInput - The input type for the generateProjectSummaryAndBullets function.
 * - GenerateProjectSummaryAndBulletsOutput - The return type for the generateProjectSummaryAndBullets function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectSummaryAndBulletsInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  role: z.string().describe('The user\'s role in the project.'),
  techStack: z
    .array(z.string())
    .describe('A list of technologies used in the project, e.g., ["React", "Node.js", "Firebase"].'),
  evidenceTextOrUrlSummary: z
    .string()
    .describe('Extracted text from uploaded files or a summary from provided URLs about the project.'),
});
export type GenerateProjectSummaryAndBulletsInput = z.infer<
  typeof GenerateProjectSummaryAndBulletsInputSchema
>;

const GenerateProjectSummaryAndBulletsOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise and impactful project summary, typically 50-80 words, highlighting purpose, contribution, and impact.'),
  bullets: z
    .array(z.string())
    .length(3)
    .describe('Exactly three impactful bullet points describing key achievements, responsibilities, or outcomes, each 1-2 sentences long.'),
});
export type GenerateProjectSummaryAndBulletsOutput = z.infer<
  typeof GenerateProjectSummaryAndBulletsOutputSchema
>;

export async function generateProjectSummaryAndBullets(
  input: GenerateProjectSummaryAndBulletsInput
): Promise<GenerateProjectSummaryAndBulletsOutput> {
  return generateProjectSummaryAndBulletsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectSummaryAndBulletsPrompt',
  input: {schema: GenerateProjectSummaryAndBulletsInputSchema},
  output: {schema: GenerateProjectSummaryAndBulletsOutputSchema},
  prompt: `You are an expert resume writer. Your task is to generate a concise project summary and exactly three impactful bullet points for a resume, based on the provided project details.

Project Name: {{{projectName}}}
Your Role: {{{role}}}
Technologies Used: {{{techStack}}}
Project Details/Evidence: {{{evidenceTextOrUrlSummary}}}

Instructions:
1. Generate a concise project summary, between 50-80 words, that highlights the project's purpose, your contribution, and its impact.
2. Generate exactly three impactful bullet points. Each bullet point should be 1-2 sentences long and describe a key achievement, responsibility, or outcome from the project.
3. Ensure the output is valid JSON according to the provided schema, especially making sure the 'bullets' array contains exactly 3 elements.`,
});

const generateProjectSummaryAndBulletsFlow = ai.defineFlow(
  {
    name: 'generateProjectSummaryAndBulletsFlow',
    inputSchema: GenerateProjectSummaryAndBulletsInputSchema,
    outputSchema: GenerateProjectSummaryAndBulletsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate project summary and bullets.');
    }
    return output;
  }
);
