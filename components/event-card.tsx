import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react"

interface EventCardProps {
  title: string
  date: string
  time: string | null
  location: string | null
}

export function EventCard({ title, date, time, location }: EventCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-balance">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <DetailRow
          icon={<CalendarIcon className="h-4 w-4 text-muted-foreground" />}
          value={date}
        />
        <DetailRow
          icon={<ClockIcon className="h-4 w-4 text-muted-foreground" />}
          value={time}
          placeholder="Não especificado"
        />
        <DetailRow
          icon={<MapPinIcon className="h-4 w-4 text-muted-foreground" />}
          value={location}
          placeholder="Não especificado"
        />
      </CardContent>
    </Card>
  )
}

function DetailRow({
  icon,
  value,
  placeholder = "Não especificado",
}: {
  icon: React.ReactNode
  value: string | null
  placeholder?: string
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className={value ? "text-sm" : "text-sm text-muted-foreground"}>
        {value ?? placeholder}
      </span>
    </div>
  )
}
