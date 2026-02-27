export const metadata = {
  title: "Purchase — biohack.tools",
  description: "Generate your peptide vendor and supply order lists.",
};

export default function PurchasePage() {
  return (
    <main className="min-h-screen bg-[hsl(var(--background))] px-5 py-16 sm:py-24 flex items-center justify-center">
      <div className="text-center">
        <p className="text-cyan-500 font-mono text-sm tracking-widest uppercase font-semibold mb-4">Coming Soon</p>
        <h1 className="text-3xl font-bold text-[hsl(var(--foreground))] mb-4">Purchase</h1>
        <p className="text-[hsl(var(--muted-foreground))] max-w-md leading-relaxed">
          Generate a clean order list from your protocol — one for your peptide vendor, one for supplies like syringes and bacteriostatic water.
        </p>
      </div>
    </main>
  );
}
