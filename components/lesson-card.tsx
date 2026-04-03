"use client"

import Link from "next/link"
import { ArrowUpRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface LessonCardProps {
  href: string
  title: string
  description: string
  lesson: number
  icon: LucideIcon
  gradient?: string
}

export function LessonCard({ 
  href, 
  title, 
  description, 
  lesson,
  icon: Icon,
  gradient = "from-blue-500/20 to-blue-600/5"
}: LessonCardProps) {
  return (
    <Link href={href} className="group block">
      <div className={cn(
        "relative h-full p-6 rounded-2xl border border-border bg-card",
        "transition-all duration-300",
        "hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5",
        "hover:-translate-y-1"
      )}>
        {/* Background gradient on hover */}
        <div className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
          "bg-gradient-to-br",
          gradient,
          "group-hover:opacity-100"
        )} />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon container */}
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
            <Icon className="h-6 w-6 text-muted-foreground group-hover:text-accent transition-colors" />
          </div>

          {/* Lesson number */}
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Lição {lesson}
          </span>

          {/* Title with arrow */}
          <div className="flex items-start justify-between gap-2 mt-2 mb-3">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
              {title}
            </h3>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1" />
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}
