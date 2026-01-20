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
    model: "openai/gpt-5",
    prompt: `Analyze the provided essay and perform the tasks below in a structured and complete manner:

1. Company extraction:
- List all company names mentioned in the text.
- Include both explicit mentions (direct company names) and implicit references (e.g., “the startup”, “the company”, “the organization”), clearly indicating which previously mentioned company each implicit reference refers to.

2. Concepts and terms:
- Identify the main relevant concepts and terms present in the essay.
- Classify each item into one of the following categories:
  a) Business Concepts (e.g., strategy, business model, market, growth, leadership).
  b) Technical Concepts (e.g., technologies, frameworks, tools, methods, engineering or IT-related terms).

3. Quotes:
- Extract all quotes present in the text (any content enclosed in quotation marks).
- For each quote, provide:
  - The exact quoted text.
  - Who said it, if this information is explicitly or implicitly stated in the essay.
  - If the speaker is not identified, set the value as null.

Organize the response clearly using ONLY the JSON structure below.
IMPORTANT:
- The structure MUST be organized PER COMPANY, not all companies grouped together.
- Do not add explanations or extra text outside the JSON.

JSON format:

[
  {
    "company": {
      "business": [
        "concept1",
        "concept2"
      ],
      "technical": [
        "term1",
        "term2"
      ],
      "quote": {
        "quote-name": "text here",
        "speaker": "name or null"
      }
    }
  }
]

Essay:
${essay}`,
  })
  AiResponse(result.text);
}

main().catch((error) => {
  AiResponseError(error);
});
