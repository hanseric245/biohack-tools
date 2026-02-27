import Link from "next/link";
import { BookOpen, FlaskConical, ShoppingCart, ClipboardList } from "lucide-react";

const MODULES = [
  {
    icon: BookOpen,
    label: "Learn",
    description: "Understand peptides, self-administration technique, and safe protocol basics.",
    cta: "Start Learning",
    href: "https://learn.biohack.tools",
    external: true,
    available: true,
  },
  {
    icon: FlaskConical,
    label: "Plan",
    description: "Build your protocol. Calculate reconstitution, draw volumes, and supply duration.",
    cta: "Open Calculator",
    href: "/plan",
    external: false,
    available: true,
  },
  {
    icon: ShoppingCart,
    label: "Purchase",
    description: "Generate a clean order list — one for your peptide vendor, one for supplies.",
    cta: "Build Order",
    href: "/purchase",
    external: false,
    available: true,
  },
  {
    icon: ClipboardList,
    label: "Track",
    description: "See what to inject today. Log your doses and monitor your active protocol.",
    cta: "Coming Soon",
    href: "/track",
    external: false,
    available: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[hsl(var(--background))] px-5 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--foreground))] tracking-tight leading-tight mb-4">
            Tools for informed
            <br />
            <span className="text-cyan-500">peptide use.</span>
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed max-w-xl">
            From your first question to your daily protocol — everything you need in one place.
          </p>
        </div>

        {/* Module cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            const card = (
              <div
                className={`
                  group relative flex flex-col h-full
                  bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6
                  transition-all duration-200
                  ${mod.available
                    ? "hover:border-cyan-500/40 cursor-pointer"
                    : "opacity-50 cursor-default"
                  }
                `}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mod.available ? "bg-cyan-500/10" : "bg-[hsl(var(--muted))]"}`}>
                    <Icon className={`w-5 h-5 ${mod.available ? "text-cyan-500" : "text-[hsl(var(--muted-foreground))]"}`} />
                  </div>
                  <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">{mod.label}</h2>
                </div>
                <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed flex-1 mb-6">
                  {mod.description}
                </p>
                <span
                  className={`
                    self-start text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-150
                    ${mod.available
                      ? "bg-cyan-500/10 text-cyan-500 group-hover:bg-cyan-500/20"
                      : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                    }
                  `}
                >
                  {mod.cta}
                </span>
              </div>
            );

            if (!mod.available) return <div key={mod.label}>{card}</div>;
            if (mod.external) return (
              <a key={mod.label} href={mod.href} target="_blank" rel="noopener noreferrer">
                {card}
              </a>
            );
            return <Link key={mod.label} href={mod.href}>{card}</Link>;
          })}
        </div>

        <p className="mt-12 text-center text-sm text-[hsl(var(--muted-foreground))] opacity-50">
          Your data stays on your device. No account needed.
        </p>
      </div>
    </main>
  );
}
