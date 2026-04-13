import { streamText, convertToModelMessages, stepCountIs } from "ai";
import { getWeather } from "./tools";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: "openai/gpt-5-mini", // Fast model for real-time chat (immediate streaming, low latency) // Reasoning models ('openai/gpt-5') would add 10-15s delay - poor UX for chat
      system: `You are a helpful assistant that provides concise answers. Use the getWeather tool to fetch current weather conditions when asked about the weather in a city. Always return only the information requested, and do not include any extra commentary or explanations.`,
      messages: await convertToModelMessages(messages),
      tools: { getWeather },
      stopWhen: stepCountIs(5),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);

    // Return a proper error response
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}