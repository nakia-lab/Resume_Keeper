'use server';
/**
 * @fileOverview This file defines a Genkit flow for rewriting job responsibilities.
 *
 * - rewriteResponsibilities - A function that takes raw job responsibilities and rewrites them into exactly three polished bullet points.
 * - RewriteResponsibilitiesInput - The input type for the rewriteResponsibilities function.
 * - RewriteResponsibilitiesOutput - The return type for the rewriteResponsibilities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteResponsibilitiesInputSchema = z.object({
  rawBullets: z
    .array(z.string())
    .describe('An array of raw, unpolished job responsibility bullet points.'),
  jobTitle: z.string().describe('The job title for these responsibilities.'),
  company: z.string().describe('The company where these responsibilities were performed.'),
  targetRole: z
    .string()
    .describe(
      'The target role the user is applying for, to tailor the responsibilities.'
    ),
});
export type RewriteResponsibilitiesInput = z.infer<
  typeof RewriteResponsibilitiesInputSchema
>;

const RewriteResponsibilitiesOutputSchema = z.object({
  bullets: z
    .array(z.string())
    .length(3, 'Must return exactly 3 bullet points.')
    .describe('Exactly three polished bullet points highlighting contributions.'),
});
export type RewriteResponsibilitiesOutput = z.infer<
  typeof RewriteResponsibilitiesOutputSchema
>;

export async function rewriteResponsibilities(
  input: RewriteResponsibilitiesInput
): Promise<RewriteResponsibilitiesOutput> {
  return rewriteResponsibilitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rewriteJobResponsibilitiesPrompt',
  input: {schema: RewriteResponsibilitiesInputSchema},
  output: {schema: RewriteResponsibilitiesOutputSchema},
  prompt: `You are an expert resume writer. Your task is to rephrase and condense the provided raw job responsibilities into exactly three highly polished, impactful bullet points.

Each bullet point should highlight achievements and contributions relevant to the context of the job title, company, and especially the target role.

Ensure the output is a JSON object with a single field named 'bullets', which is an array containing exactly three strings (the rewritten bullet points).

Job Title: {{{jobTitle}}}
Company: {{{company}}}
Target Role: {{{targetRole}}}
Raw Responsibilities:
{{#each rawBullets}}- {{{this}}}
{{/each}}

Rewritten Responsibilities:`,
});

const rewriteResponsibilitiesFlow = ai.defineFlow(
  {
    name: 'rewriteJobResponsibilitiesFlow',
    inputSchema: RewriteResponsibilitiesInputSchema,
    outputSchema: RewriteResponsibilitiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate rewritten responsibilities.');
    }
    // Ensure the output array length is exactly 3 as per schema
    if (output.bullets.length !== 3) {
      console.warn(
        `AI returned ${output.bullets.length} bullets, expected 3. Attempting to adjust.`
      );
      // Simple heuristic: if too many, take first 3. If too few, pad with empty.
      const adjustedBullets = output.bullets.slice(0, 3);
      while (adjustedBullets.length < 3) {
        adjustedBullets.push(''); // Pad with empty strings if less than 3
      }
      output.bullets = adjustedBullets;
    }
    return output;
  }
);
