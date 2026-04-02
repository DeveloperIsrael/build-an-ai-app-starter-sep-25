import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react"

interface AppointmentCardProps {
  title: string
  date: string
  time: string | null
  location: string | null
}

export function AppointmentCard({
  title,
  date,
  time,
  location,
}: AppointmentCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden border-l-4 border-l-primary">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-3 text-balance">
          {title}
        </h3>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
            <span className="text-foreground">{date}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <ClockIcon className="h-4 w-4 text-primary shrink-0" />
            <span className={time ? "text-foreground" : "text-muted-foreground italic"}>
              {time ?? "Horário não especificado"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPinIcon className="h-4 w-4 text-primary shrink-0" />
            <span className={location ? "text-foreground" : "text-muted-foreground italic"}>
              {location ?? "Local não especificado"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
