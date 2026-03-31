import z from "zod";

export const moderationSchema = z.object({
  severity: z.enum(['safe', 'warning', 'critical']),
  categories: z.array(z.enum(['spam', 'violence', 'pii', 'other'])),
  confidence: z.number().min(0).max(1)
});

export type ModerationResult = z.infer<typeof moderationSchema>;

export async function sendAlert(message: string, classification: ModerationResult) {
  console.log('\n--- CRITICAL ALERT ---');
  console.log('Message:', message);
  console.log('Classification:', JSON.stringify(classification, null, 2));
  console.log('----------------------');
}