import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();
import fs from "fs";
import { generateText } from 'ai';
import { AiResponseError } from '../output/aiResponse';

// import essay
const essay = fs.readFileSync("app/(1-extraction)/essay.txt", "utf-8");

// Structured JSON extraction
const structuredPrompt = `Extract ONLY real, named individuals explicitly mentioned in the essay.
Rules:
- Do NOT include groups, roles, or abstract entities as people.
- Only infer relationships if they are explicitly stated or strongly implied in the text.
- Relationships must be directional and textual (e.g., "spoke_at_event_with", "was_inspired_by").
- Do NOT guess relationships.

Output strict JSON:
 
{
  "people": [
    {
      "name": "Full Name",
      "role": "Role only if explicitly stated",
      "relationships": [
        {
          "type": "relationship_type",
          "target": "Other Person Name"
        }
      ]
    }
  ]
}
 
Essay: ${essay}`;

// Consistency testing function
async function testConsistency(prompt: string, iterations: number = 3) {
  const results = [];
  for (let i = 0; i < iterations; i++) {
    const result = await generateText({ model: 'openai/gpt-5-mini', prompt });
    results.push(result.text);
  }

  console.log('Consistency Test Results:');
  results.forEach((result, i) => {
    console.log(`Run ${i + 1}:`, result);
  });
}

testConsistency(structuredPrompt).catch((error) => AiResponseError(error));