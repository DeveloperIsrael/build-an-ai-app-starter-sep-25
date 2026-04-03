"use client"

import Link from "next/link"
import { Sparkles, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-background" />
            </div>
            <span className="font-semibold text-foreground">AI SDK</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/summarization" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sumarização
            </Link>
            <Link 
              href="/extraction" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Extração
            </Link>
            <Link 
              href="/chat" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Chatbot
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a 
              href="https://vercel.com/academy/ai-sdk" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                Tutorial
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
            <Link href="/summarization">
              <Button size="sm">
                Começar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
