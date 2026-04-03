"use client"

import { AppointmentCard, type Appointment } from "@/components/appointment-card"
import { Sparkles } from "lucide-react"

const demoAppointment: Appointment = {
  title: "AI Sync Meeting",
  date: "15 de Novembro, 2025",
  startTime: "14:00",
  endTime: "15:30",
  location: "Google Meet",
  attendees: ["Maria Silva", "João Santos", "Ana Costa"]
}

export function DemoSection() {
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-accent" />
              UI Generativa
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Crie interfaces dinâmicas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
                com AI
              </span>
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              Extraia dados estruturados de texto não estruturado e renderize 
              componentes de UI bonitos automaticamente. O AI SDK torna simples 
              construir experiências de usuário inteligentes.
            </p>

            <div className="pt-4 space-y-4">
              <FeatureItem>
                Extração de dados com schemas Zod
              </FeatureItem>
              <FeatureItem>
                Streaming de respostas em tempo real
              </FeatureItem>
              <FeatureItem>
                Suporte a múltiplos provedores de AI
              </FeatureItem>
            </div>
          </div>

          {/* Right side - Demo card */}
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute -inset-4 bg-gradient-to-r from-accent/10 via-blue-500/5 to-transparent rounded-3xl blur-xl" />
            
            {/* Card container */}
            <div className="relative">
              <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium shadow-lg">
                Resultado da extração
              </div>
              <AppointmentCard appointment={demoAppointment} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
      <span className="text-foreground text-sm">{children}</span>
    </div>
  )
}
