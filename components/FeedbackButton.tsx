"use client";

import { MessageSquare } from "lucide-react";

export function FeedbackButton() {
  return (
    <a
      href="https://forms.gle/ivbStBnAymg4vYDT9"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:border-cyan-500/40 shadow-sm transition-all duration-150"
    >
      <MessageSquare className="w-4 h-4 shrink-0 text-cyan-500 animate-pulse" />
      <span className="text-sm">Feedback</span>
    </a>
  );
}
