'use server';

import { generateText, Output } from 'ai';
import { z } from 'zod';

const summarySchema = z.object({
  headline: z.string().max(40)
    .describe('5 words max. Topic only, no punctuation.'),

  context: z.array(z.string().max(120)).min(1).max(2)
    .describe('1 or 2 strings. Each max 120 chars. Plain text, no markdown.'),

  discussionPoints: z.array(z.string().max(120)).min(1).max(2)
    .describe('1 or 2 strings. Each max 120 chars. Plain text, no markdown.'),

  takeaways: z.array(z.string().max(120)).min(2).max(3)
    .describe('2 or 3 strings. Each is one action item starting with a verb. Max 120 chars each.'),
});

const promptBase: string =
  `You are a strict summarization engine.

Follow ALL rules exactly:
- Do NOT exceed limits
- Do NOT add extra sentences
- Do NOT explain anything

FORMAT RULES:
- headline: max 5 words
- context: EXACTLY 1-2 sentences
- discussionPoints: EXACTLY 1-2 sentences
- takeaways: MUST be an array with 2-3 items
- Each takeaway must be a single short sentence
- Include names when assigning actions

CONSTRAINTS:
- Each sentence must have max 15 words
- No commas joining multiple ideas
- No paragraphs
- No markdown
- Output must strictly match the schema

If you break rules, the output is invalid.`

export const generateSummary = async (comments: any[]) => {
  console.log("Generating summary for", comments.length, "comments...");
  let lastError = "";

  for (let i = 0; i < 3; i++) {
    try {
      const { output } = await generateText({
        model: "openai/gpt-5-mini",
        prompt: `${promptBase}
${lastError ? `Previous output was invalid: ${lastError}` : ""}

Comments:
${JSON.stringify(comments)}`,
        output: Output.object({
          schema: summarySchema,
        }),
      });

      return output;

    } catch (err: any) {
      lastError = err?.message || "Invalid format";
      console.warn(`Attempt ${i + 1} failed:`, lastError);
    }
  }
  throw new Error("Failed to generate valid summary")
};