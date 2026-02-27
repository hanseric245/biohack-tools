"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "Learn", href: "https://learn.biohack.tools", external: true },
  { label: "Plan", href: "/plan" },
  { label: "Purchase", href: "/purchase" },
  { label: "Track", href: "/track" },
];

export function PortalNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--nav-border))] bg-[hsl(var(--nav-bg))]/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link href="/" className="text-cyan-500 font-mono text-sm tracking-widest uppercase font-semibold hover:text-cyan-400 transition-colors">
          biohack.tools
        </Link>
        <div className="flex items-center gap-1">
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = !item.external && pathname.startsWith(item.href);
              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-lg transition-colors",
                    active
                      ? "text-cyan-500 bg-cyan-500/10"
                      : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-2 pl-2 border-l border-[hsl(var(--border))]">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
