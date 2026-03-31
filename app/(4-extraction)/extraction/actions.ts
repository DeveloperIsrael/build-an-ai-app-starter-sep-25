"use server";

import { generateText, Output } from "ai";
import { appointmentSchema, type AppointmentDetails } from "./schemas";

export const extractAppointment = async (
	input: string,
): Promise<AppointmentDetails> => {
	console.log(`Extracting from: "${input}"`);

	const { output: appointmentDetails } = await generateText({
		model: "openai/gpt-5-mini",
		prompt: `
		TIME RULES:
- morning = 09:00
- afternoon = 14:00
- evening = 18:00
- night = 20:00

DURATION RULE:
- If endTime is missing → endTime = startTime + 1 hour

FORMAT RULES:
- Time MUST be HH:MM (24h, zero padded)
- Examples: 09:00, 14:30
- NEVER return "2pm" or "2:30"

If any rule is broken, output is invalid.

		Extract the appointment details from the following natural language input:\n\n"${input}"`,
		output: Output.object({
			schema: appointmentSchema,
		}),
	});

	console.log("Extracted details:", appointmentDetails);
	return appointmentDetails;
};