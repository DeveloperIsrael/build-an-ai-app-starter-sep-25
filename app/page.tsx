import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { LessonCard } from "@/components/lesson-card"
import { DemoSection } from "@/components/demo-section"
import { Footer } from "@/components/footer"
import { FileText, Database, MessageSquare } from "lucide-react"

const lessons = [
  {
    href: "/summarization",
    title: "Sumarização",
    description: "Aprenda a usar AI para resumir conteúdo de texto e mensagens de forma inteligente e contextual.",
    lesson: 3,
    icon: FileText,
    gradient: "from-emerald-500/20 to-emerald-600/5"
  },
  {
    href: "/extraction",
    title: "Extração",
    description: "Extraia dados estruturados de texto não estruturado usando schemas Zod e validação automática.",
    lesson: 4,
    icon: Database,
    gradient: "from-blue-500/20 to-blue-600/5"
  },
  {
    href: "/chat",
    title: "Chatbot",
    description: "Construa um chatbot interativo com streaming de respostas e chamadas de ferramentas em tempo real.",
    lesson: 5,
    icon: MessageSquare,
    gradient: "from-amber-500/20 to-amber-600/5"
  }
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />

        {/* Lessons Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Explore as Lições
              </h2>
              <p className="text-muted-foreground text-lg">
                Siga o tutorial completo para aprender a construir aplicações com AI do zero.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => (
                <LessonCard key={lesson.href} {...lesson} />
              ))}
            </div>
          </div>
        </section>

        <DemoSection />
      </main>

      <Footer />
    </div>
  )
}
