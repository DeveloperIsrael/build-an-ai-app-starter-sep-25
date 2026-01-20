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
    prompt: `What is the key takeaway of this piece in 50 words?
Essay:
${essay}`,
  })
  AiResponse(result.text);
}

main().catch((error) => {
  AiResponseError(error);
});
