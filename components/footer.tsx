import Link from "next/link"
import { Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and description */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-background" />
            </div>
            <div>
              <span className="font-semibold text-foreground">AI SDK</span>
              <p className="text-xs text-muted-foreground">By Vercel</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm">
            <a 
              href="https://sdk.vercel.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Documentação
            </a>
            <a 
              href="https://github.com/vercel/ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://vercel.com/academy/ai-sdk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Tutorial
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vercel, Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}
