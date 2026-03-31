import dotenvFlow from "dotenv-flow";
dotenvFlow.config();

import supportRequests from "./support_requests_multilanguage.json";
import { z } from "zod";
import { generateText, Output } from "ai";

async function main() {
  console.log("Asking AI to classify support requests...");

  const categories = [
    'billing',
    'product_issues',
    'enterprise_sales',
    'account_issues',
    'product_feedback'
  ] as const;

  // Define the schema for a single classified request
  const classificationSchema = z.object({
    request: z.string()
      .describe('The original support request text.'),

    category: z.array(z.enum(categories))
      .min(1)
      .max(3)
      .describe(`
    Assign the MOST RELEVANT categories (1 to 3 maximum).

    Decision rules:
    - Always include the PRIMARY root cause
    - Add a second category ONLY if it is clearly a separate concern
    - Do NOT include categories that are only indirectly related

    Examples:
    - "I was charged twice" → ["billing"]
    - "App crashes after login" → ["product_issues"]
    - "I can't access premium after payment" → ["billing", "product_issues"]

    Anti-pattern:
    - Do NOT assign all possible categories
    - Do NOT include "product_issues" unless there is an actual bug or failure

    Be selective, not exhaustive.

    Category definitions:
    - billing → payments, invoices, refunds, charges
    - product_issues → bugs, crashes, things not working
    - account_issues → login, password, access problems (NOT caused by billing)
    - enterprise_sales → pricing inquiries for teams, demos, enterprise plans
    - product_feedback → suggestions, feature requests, opinions
  `),

    urgency: z.enum(['low', 'medium', 'high'])
      .describe(`
      Classify urgency based on impact:

      high:
      - User is blocked from using the product
      - Payment issues affecting access
      - Business-critical failure
      - Strong negative emotion (angry, urgent tone)

      medium:
      - Partial functionality broken
      - Non-critical bugs
      - सामान्य support requests

      low:
      - Feature requests
      - General questions
      - Feedback without issues

      Never default to medium — choose based on impact.
    `),

    confidence: z.number().min(0).max(1)
      .describe(`
      Confidence score from 0 to 1.

      0.9–1.0 → Very clear intent
      0.7–0.89 → Likely correct
      0.4–0.69 → Ambiguous
      <0.4 → Very unclear / mixed intent
    `),

    reasoning: z.string()
      .describe(`
      Short explanation of why this category and urgency were chosen.
      Mention key phrases or signals from the request.
    `),

    language: z.string()
      .describe(`
      Detect the full language name (e.g., English, Portuguese, Spanish).
    `),
  });


  // Use generateText with Output.array() to get structured output
  const { output: classifiedRequests } = await generateText({
    model: 'openai/gpt-5-mini', // Fast model ideal for classification tasks (low cost, immediate response)
    // For nuanced edge cases, consider 'openai/gpt-5' (reasoning model)
    // Prompt combines instruction + stringified data
    prompt: `Classify the following support requests based on the defined categories.\n\n${JSON.stringify(supportRequests)}`,
    // Output.array() tells the SDK we expect an array of objects matching our schema
    output: Output.array({
      element: classificationSchema,
    }),
  });

  console.log('\n--- AI Response (Structured JSON) ---');
  // Output the validated, structured array
  console.log(JSON.stringify(classifiedRequests, null, 2));
  console.log('-----------------------------------');
}

main().catch(console.error);
