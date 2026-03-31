// Modified schema with date transformation
import { z } from 'zod';
import { parseISO } from 'date-fns'; // Install with: pnpm add date-fns

export const AppointmentSchemaAdvanced = z.object({
    title: z.string(),
    date: z.string()
        .describe('The appointment date in ISO format (YYYY-MM-DD)')
        .transform(dateStr => {
            try {
                return parseISO(dateStr);
            } catch (e) {
                // If parsing fails, return the original string
                // This allows Zod validation to continue
                return new Date('Invalid Date');
            }
        })
        .refine(date => !isNaN(date.getTime()), {
            message: 'Invalid date format, must be YYYY-MM-DD'
        }),
    time: z.string()
        .describe('The appointment time in 24-hour format (HH:MM)')
        .nullable(),
    endTime: z.string()
        .describe('The appointment end time in 24-hour format (HH:MM). If not specified, assume a 1-hour duration after time.')
        .nullable(),
    location: z.string().nullable(),
    frequency: z.enum(['daily', 'weekly', 'monthly']).nullable(),
    attendees: z.array(z.string()).nullable(),
});

export type AppointmentDetailsAdvanced = z.infer<typeof AppointmentSchemaAdvanced>;

// Enhanced prompt that emphasizes date format requirements
export const prompt = `
  Extract appointment details from this text.
  ALWAYS format dates as ISO strings (YYYY-MM-DD), converting relative dates
  like "tomorrow" or "next Friday" to actual calendar dates based on today
  being ${new Date().toISOString().split('T')[0]}.
 
  Registry the frequency of the appointment if mentioned (e.g., "daily", "weekly", "monthly").
  endTime too necessary if time is provided, if not provided, assume a 1-hour duration after time.

  Text: 
`;