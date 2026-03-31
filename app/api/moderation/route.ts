import { moderationSchema, sendAlert } from '@/lib/sendAlert';
import { generateText, Output } from 'ai';
export async function handleMessage(message: string) {
  // TODO: classify, score, and route message
  const { output: classification } = await generateText({
    model: 'openai/gpt-5-mini',
    output: Output.object({
      schema: moderationSchema,
    }),
    prompt: `Classify this message: "${message}"`
  });
 
  // Route based on severity
  if (classification.severity === 'critical') {
    await sendAlert(message, classification);
  }
 
  return classification;
}