export const metadata = {
  title: "Track — biohack.tools",
  description: "See what to inject today and log your doses.",
};

export default function TrackPage() {
  return (
    <main className="min-h-screen bg-[hsl(var(--background))] px-5 py-16 sm:py-24 flex items-center justify-center">
      <div className="text-center">
        <p className="text-cyan-500 font-mono text-sm tracking-widest uppercase font-semibold mb-4">Coming Soon</p>
        <h1 className="text-3xl font-bold text-[hsl(var(--foreground))] mb-4">Track</h1>
        <p className="text-[hsl(var(--muted-foreground))] max-w-md leading-relaxed">
          See exactly what to inject today based on your active protocol. Log each dose and monitor your schedule — no calendar needed.
        </p>
      </div>
    </main>
  );
}
