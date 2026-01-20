import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();
import fs from "fs";
import { generateText } from 'ai';
import { AiResponse, AiResponseError } from '../output/aiResponse';

// import essay
const essay = fs.readFileSync("app/(1-extraction)/essay.txt", "utf-8");

async function main() {
  // Call the LLM with our extraction prompt
  const result = await generateText({
    model: "openai/gpt-5-mini",
    prompt: `Extract structured information from the provided text.

Return a single JSON object with the following sections:
- entities (companies, people, aliases)
- concepts (business and technical)
- quotes (text, speaker, related entity)
- relations (entity-to-entity relationships)

Rules:
- Do not infer information not present in the text.
- Use null when data is missing.
- Keep each data type strictly separated.
- Do not include explanations outside the JSON.


JSON format:

{
  "meta": {
    "source_type": "essay",
    "language": "en",
    "confidence": "high"
  },
  "entities": {
    "companies": [
      {
        "name": "Company Name",
        "aliases": ["the startup", "the company"]
      }
    ],
    "people": [
      {
        "name": "Person Name",
        "role": "CEO"
      }
    ]
  },
  "concepts": {
    "business": [
      {
        "term": "Business Model",
        "context": "Used to describe revenue strategy"
      }
    ],
    "technical": [
      {
        "term": "REST API",
        "context": "Mentioned in system integration"
      }
    ]
  },
  "quotes": [
    {
      "text": "Quoted text here",
      "speaker": "Name or null",
      "company": "Related company or null"
    }
  ],
  "relations": [
    {
      "from": "Company A",
      "type": "uses",
      "to": "Technology X"
    }
  ]
}

Essay:
${essay}`,
  })
  AiResponse(result.text);
}

main().catch((error) => {
  AiResponseError(error);
});
