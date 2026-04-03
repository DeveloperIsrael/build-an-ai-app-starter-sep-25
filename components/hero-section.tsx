"use client"

import { Sparkles, ArrowRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground mb-8">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>Vercel AI SDK 6.0</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance">
            O Kit de Ferramentas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
              AI
            </span>{" "}
            para TypeScript
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Dos criadores do Next.js, o AI SDK é uma biblioteca open-source gratuita 
            que fornece as ferramentas necessárias para construir produtos com inteligência artificial.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/summarization">
              <Button size="lg" className="gap-2 px-6 h-12 text-base font-medium">
                Começar Tutorial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a 
              href="https://github.com/vercel/ai" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 px-6 h-12 text-base font-medium border-border hover:bg-secondary"
              >
                <Github className="h-4 w-4" />
                Ver no GitHub
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
