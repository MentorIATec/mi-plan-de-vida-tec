
'use server';
/**
 * @fileOverview A life path suggestion AI agent.
 *
 * - suggestLifePaths - A function that handles the life path suggestion process.
 * - LifePathRequest - The input type for the suggestLifePaths function.
 * - LifePathSuggestion - The return type for the suggestLifePaths function.
 */
import { ai } from '../genkit';
import { z } from 'zod';

const LifePathRequestSchema = z.object({
  passion: z.array(z.string()).nonempty(),
  mission: z.array(z.string()).nonempty(),
  vocation: z.array(z.string()).nonempty(),
  profession: z.array(z.string()).nonempty(),
});
export type LifePathRequest = z.infer<typeof LifePathRequestSchema>;

const LifePathSuggestionSchema = z.array(z.string());
export type LifePathSuggestion = z.infer<typeof LifePathSuggestionSchema>;


const suggestLifePathsPrompt = ai.definePrompt({
  name: 'suggestLifePathsPrompt',
  input: { schema: LifePathRequestSchema },
  output: { schema: LifePathSuggestionSchema },
  prompt: `
You are an expert career and life coach specializing in the Japanese concept of Ikigai.
Based on the user's answers to the four pillars of Ikigai, generate 3 to 5 actionable and inspiring life path suggestions.
Each suggestion should be a single, complete sentence. The suggestions should be diverse and creative, synthesizing the user's inputs into coherent paths.

Do not respond with a preamble, introduction, or any text other than the suggestions. Do not number the list. Each suggestion should be on a new line.

Here are the user's reflections:

Passion (what they love):
{{#each passion}}
- {{this}}
{{/each}}

Mission (what they are good at):
{{#each mission}}
- {{this}}
{{/each}}

Vocation (what the world needs):
{{#each vocation}}
- {{this}}
{{/each}}

Profession (what they can be paid for):
{{#each profession}}
- {{this}}
{{/each}}
`,
  config: {
    temperature: 0.8,
  }
});


const suggestLifePathsFlow = ai.defineFlow(
  {
    name: 'suggestLifePathsFlow',
    inputSchema: LifePathRequestSchema,
    outputSchema: LifePathSuggestionSchema,
  },
  async (input) => {
    const llmResponse = await suggestLifePathsPrompt(input);

    return llmResponse.output!
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => s.startsWith('- ') ? s.substring(2) : s);
  }
);


export async function suggestLifePaths(input: LifePathRequest): Promise<LifePathSuggestion> {
  return suggestLifePathsFlow(input);
}
