"use server";

import { generateText, Output } from "ai";
import { AppointmentDetailsAdvanced, AppointmentSchemaAdvanced, prompt as promptAdvanced  } from "./advanced-date-parsing";
// import { appointmentSchema, type AppointmentDetails } from "./schemas";

export const extractAppointment = async (
	input: string,
): Promise<AppointmentDetailsAdvanced> => {
	console.log(`Extracting from: "${input}"`);

	const { output: appointmentDetails } = await generateText({
		model: "openai/gpt-5-mini",
		prompt: `${promptAdvanced} "${input}"`,
		output: Output.object({
			schema: AppointmentSchemaAdvanced,
		}),
	});

	console.log("Extracted details:", appointmentDetails);
	return appointmentDetails;
};