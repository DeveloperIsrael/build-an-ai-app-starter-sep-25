import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();
import fs from "fs";
import { streamText } from 'ai';
import { AiResponse, AiResponseError } from '../output/aiResponse';

// import filePath
const file = "app/(1-extraction)/essay.txt";

export async function extractLargeDocument(filePath: string) {
    // TODO: chunk file, stream extraction, merge results
    const essay = fs.readFileSync(filePath, "utf-8");
    const chunks = [];
    const batchSize = 4000; // tokens per chunk

    // 1. Split document into chunks
    for (let i = 0; i < essay.length; i += batchSize) {

    }
    // 2. Process each chunk with streamText
    // 3. Merge extracted data
    // 4. Return consolidated result
}