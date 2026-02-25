'use server';
/**
 * @fileOverview This file defines a Genkit flow to generate professional 'About' sections and short bios for a resume.
 *
 * - generateAbout - A function that handles the generation process for the 'About' section and short bio.
 * - GenerateAboutInput - The input type for the generateAbout function.
 * - GenerateAboutOutput - The return type for the generateAbout function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAboutInputSchema = z.object({
  targetRoles: z.array(z.string()).describe('A list of target job roles or positions.'),
  strengths: z.array(z.string()).describe('Key professional strengths or skills.'),
  industries: z.array(z.string()).describe('Industries where the user has experience or is seeking opportunities.'),
  achievements: z.array(z.string()).describe('Notable professional achievements or accomplishments.'),
  tone: z.string().describe('The desired tone for the write-up (e.g., professional, friendly, innovative).'),
});
export type GenerateAboutInput = z.infer<typeof GenerateAboutInputSchema>;

const GenerateAboutOutputSchema = z.object({
  longAbout: z
    .string()
    .describe('An 80-120 word professional "About" paragraph for a resume.'),
  shortBio: z
    .string()
    .describe('A concise 1-2 sentence short bio for a resume.'),
});
export type GenerateAboutOutput = z.infer<typeof GenerateAboutOutputSchema>;

export async function generateAbout(input: GenerateAboutInput): Promise<GenerateAboutOutput> {
  return generateAboutFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAboutPrompt',
  input: {schema: GenerateAboutInputSchema},
  output: {schema: GenerateAboutOutputSchema},
  prompt:
    'You are a professional resume writer. Your task is to craft compelling and concise personal statements for a resume.

    Based on the following information, generate two pieces of text:
    1. A "longAbout" paragraph: This should be a professional "About" section, between 80 and 120 words long, highlighting the user\u0027s experience, skills, and aspirations. Avoid using first-person pronouns like "I" or "my" unless explicitly asked to in the tone.
    2. A "shortBio" sentence: This should be a very concise, 1-2 sentence summary suitable for a quick introduction.

    Ensure the output is in JSON format matching the provided schema.

    User Information:
    Target Roles: {{{targetRoles}}}
    Strengths: {{{strengths}}}
    Industries: {{{industries}}}
    Achievements: {{{achievements}}}
    Desired Tone: {{{tone}}}

    Generate the JSON output:',
});

const generateAboutFlow = ai.defineFlow(
  {
    name: 'generateAboutFlow',
    inputSchema: GenerateAboutInputSchema,
    outputSchema: GenerateAboutOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
