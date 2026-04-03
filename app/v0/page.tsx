import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AppointmentCard, type Appointment } from "@/components/appointment-card"
import { Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const appointmentData: Appointment = {
  title: "AI Sync Meeting",
  date: "15 de Novembro, 2025",
  startTime: "14:00",
  endTime: "15:30",
  location: "Virtual - Google Meet",
  attendees: ["Maria Silva", "João Santos", "Ana Costa", "Pedro Lima"]
}

export default function V0Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-20">
          {/* Back button */}
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 mb-8 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground mb-6">
                <Sparkles className="h-4 w-4 text-accent" />
                <span>Demonstração de Extração</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Compromisso Extraído
              </h1>
              
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Este é um exemplo de componente de UI generativa. O AI SDK extrai 
                dados estruturados e renderiza componentes bonitos automaticamente.
              </p>
            </div>

            {/* Card container */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/10 via-blue-500/10 to-accent/10 rounded-3xl blur-2xl" />
                
                {/* Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium shadow-lg">
                    Gerado por AI
                  </span>
                </div>

                {/* Card */}
                <div className="relative">
                  <AppointmentCard appointment={appointmentData} />
                </div>
              </div>
            </div>

            {/* Info section */}
            <div className="mt-16 p-6 rounded-2xl border border-border bg-card/50">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Como funciona?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <InfoItem 
                  step={1}
                  title="Entrada de Texto"
                  description="O usuário fornece texto não estruturado com informações do compromisso."
                />
                <InfoItem 
                  step={2}
                  title="Extração com AI"
                  description="O AI SDK usa schemas Zod para extrair dados estruturados do texto."
                />
                <InfoItem 
                  step={3}
                  title="Renderização"
                  description="Os dados extraídos são renderizados em componentes de UI elegantes."
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function InfoItem({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-semibold shrink-0">
        {step}
      </div>
      <div>
        <h3 className="font-medium text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
