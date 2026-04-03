import { GeneratedCard } from "@/components/GenerateCard"

 
export default function MyPage() {
	const appointmentData = {
		// Example data
		title: 'AI Sync Meeting',
		date: '2025-11-15',
		time: '14:00',
		location: 'Virtual',
	}
 
	return (
		<div className="flex flex-col items-center p-4">
			<h1>Upcoming Appointment</h1>
			<GeneratedCard {...appointmentData} />
		</div>
	)
}