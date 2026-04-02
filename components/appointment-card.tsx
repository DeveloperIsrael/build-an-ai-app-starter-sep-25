import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { z } from "zod"

export const appointmentSchema = z.object({
  title: z.string(),
  startTime: z.string().nullable(),
  endTime: z.string().nullable(),
  attendees: z.array(z.string()).nullable(),
  location: z.string().nullable(),
  date: z.string(),
})

export type Appointment = z.infer<typeof appointmentSchema>

interface AppointmentCardProps {
  appointment: Appointment | null
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <Card className="overflow-hidden bg-blue-600 text-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-blue-700 border-0">
      <CardHeader className="px-6 py-5">
        <CardTitle className="text-xl font-bold text-white">
          {appointment?.title || "Sem compromisso definido"}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 space-y-4">
        <DetailRow
          icon={<CalendarIcon className="h-5 w-5 text-blue-200" />}
          label="Data"
          value={appointment?.date}
          placeholder="Não especificado"
        />
        
        <DetailRow
          icon={<ClockIcon className="h-5 w-5 text-blue-200" />}
          label="Horário"
          value={
            appointment?.startTime && appointment?.endTime
              ? `${appointment.startTime} - ${appointment.endTime}`
              : appointment?.startTime || appointment?.endTime || null
          }
          placeholder="Não especificado"
        />
        
        <DetailRow
          icon={<MapPinIcon className="h-5 w-5 text-blue-200" />}
          label="Local"
          value={appointment?.location}
          placeholder="Não especificado"
        />
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-blue-200" />
            <span className="text-sm font-medium text-blue-100">Participantes</span>
          </div>
          {appointment?.attendees && appointment.attendees.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {appointment.attendees.map((attendee, index) => (
                <div key={index} className="flex items-center gap-2 bg-blue-500/50 rounded-full px-3 py-1.5">
                  <Avatar className="h-6 w-6 border border-blue-300">
                    <AvatarFallback className="bg-blue-400 text-white text-xs font-medium">
                      {attendee
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-white">{attendee}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-blue-200">Não especificado</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function DetailRow({
  icon,
  label,
  value,
  placeholder,
}: {
  icon: React.ReactNode
  label: string
  value: string | null | undefined
  placeholder: string
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div className="flex flex-col">
        <span className="text-xs font-medium text-blue-200">{label}</span>
        <span className="text-sm font-semibold text-white">
          {value || <span className="font-normal text-blue-200">{placeholder}</span>}
        </span>
      </div>
    </div>
  )
}
