import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MessageSquare, List, CheckCircle } from "lucide-react"

interface SummaryCardProps {
  headline: string
  context: string
  discussionPoints: string
  takeaways: string
}

export function SummaryCard({
  headline,
  context,
  discussionPoints,
  takeaways,
}: SummaryCardProps) {
  const discussionItems = parseToList(discussionPoints)
  const takeawayItems = parseToList(takeaways)

  return (
    <Card className="w-full max-w-2xl border border-border/50 shadow-md bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-foreground text-balance leading-tight">
          {headline}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <Section
          icon={<MessageSquare className="h-5 w-5 text-muted-foreground shrink-0" />}
          title="Contexto"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            {context}
          </p>
        </Section>

        <Section
          icon={<List className="h-5 w-5 text-muted-foreground shrink-0" />}
          title="Pontos de Discussão"
        >
          <ul className="space-y-2">
            {discussionItems.map((item, index) => (
              <li
                key={index}
                className="text-sm text-foreground flex items-start gap-2"
              >
                <span className="text-muted-foreground mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          icon={<CheckCircle className="h-5 w-5 text-muted-foreground shrink-0" />}
          title="Conclusões"
        >
          <ul className="space-y-2">
            {takeawayItems.map((item, index) => (
              <li
                key={index}
                className="text-sm text-foreground flex items-start gap-2"
              >
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      </CardContent>
    </Card>
  )
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      </div>
      <div className="pl-7">{children}</div>
    </div>
  )
}

function parseToList(text: string): string[] {
  if (!text) return []

  const lines = text
    .split(/[\n;]/)
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter((line) => line.length > 0)

  return lines.length > 0 ? lines : [text]
}
