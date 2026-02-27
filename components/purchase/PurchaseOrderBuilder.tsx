"use client";

import { useState } from "react";
import { Plus, Trash2, Printer, ExternalLink, ShoppingCart, Package } from "lucide-react";
import { PEPTIDES } from "@/lib/constants";

const VIAL_SIZES = [
  "1 mg",
  "5 mg",
  "6 mg",
  "10 mg",
  "20 mg",
  "100 mg",
  "500 mg",
  "600 mg",
  "10 iu",
  "250 mcg (50 caps)",
  "5 mg (50 caps)",
  "25 mg (50 caps)",
  "100 mg (50 caps)",
  "Custom…",
];

interface PeptideItem {
  id: string;
  name: string;
  vialSize: string;
  quantity: number;
}

interface SupplyItem {
  id: string;
  name: string;
  detail: string;
  quantity: number;
  checked: boolean;
  recurrence: "one-time" | "recurring";
  url: string | null;
}

const DEFAULT_SUPPLIES: SupplyItem[] = [
  {
    id: "recon-syringes",
    name: "Reconstitution syringes",
    detail: "U-30, for drawing BW into vials",
    quantity: 1,
    checked: false,
    recurrence: "recurring",
    url: "https://a.co/d/01UIBqLo",
  },
  {
    id: "inject-syringes",
    name: "Injection syringes",
    detail: '31G 5/16" U-100, 50ct',
    quantity: 1,
    checked: false,
    recurrence: "recurring",
    url: "https://a.co/d/06hcgI2P",
  },
  {
    id: "bac-water",
    name: "Bacteriostatic water",
    detail: "30ml vial — pharmacy or compounding",
    quantity: 1,
    checked: false,
    recurrence: "recurring",
    url: null,
  },
];

const inputClass =
  "w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--foreground))] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 transition-colors";

const labelClass = "block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1 uppercase tracking-wide";

export function PurchaseOrderBuilder() {
  const [peptides, setPeptides] = useState<PeptideItem[]>([]);
  const [supplies, setSupplies] = useState<SupplyItem[]>(DEFAULT_SUPPLIES);
  const [vendorName, setVendorName] = useState<string>("");

  // New peptide form state
  const [newName, setNewName] = useState(PEPTIDES[0]);
  const [newVialSize, setNewVialSize] = useState<string>("10 mg");
  const [newVialSizeCustom, setNewVialSizeCustom] = useState<string>("");
  const [newQty, setNewQty] = useState<number>(1);

  // Custom supply form state
  const [newSupplyName, setNewSupplyName] = useState("");

  function addCustomSupply() {
    const trimmed = newSupplyName.trim();
    if (!trimmed) return;
    setSupplies((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: trimmed,
        detail: "",
        quantity: 1,
        checked: false,
        recurrence: "recurring",
        url: null,
      },
    ]);
    setNewSupplyName("");
  }

  function removeSupply(id: string) {
    setSupplies((prev) => prev.filter((s) => s.id !== id));
  }

  function addPeptide() {
    const vialSize = newVialSize === "Custom…" ? newVialSizeCustom.trim() : newVialSize;
    if (!newName || !vialSize || newQty <= 0) return;
    setPeptides((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: newName,
        vialSize,
        quantity: newQty,
      },
    ]);
    if (newVialSize === "Custom…") setNewVialSizeCustom("");
  }

  function removePeptide(id: string) {
    setPeptides((prev) => prev.filter((p) => p.id !== id));
  }

  function updateSupply(id: string, patch: Partial<SupplyItem>) {
    setSupplies((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  const checkedSupplies = supplies.filter((s) => s.checked);
  const hasAnyOutput = peptides.length > 0 || checkedSupplies.length > 0;

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">Purchase Order Builder</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
            Build your peptide and supply lists, then save/print to share with your provider.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ── Left: Build ── */}
          <div className="space-y-6">

            {/* Peptides section */}
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-4 h-4 text-cyan-500" />
                <h2 className="text-sm font-semibold text-[hsl(var(--foreground))] uppercase tracking-wide">
                  Peptides
                </h2>
              </div>

              {/* Add form */}
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Vendor name</label>
                  <input
                    type="text"
                    placeholder="e.g. Limitless Life, Peptide Sciences…"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="h-px bg-[hsl(var(--border))]" />
                <div>
                  <label className={labelClass}>Peptide</label>
                  <select
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className={inputClass}
                  >
                    {PEPTIDES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Vial size</label>
                    <select
                      value={newVialSize}
                      onChange={(e) => setNewVialSize(e.target.value)}
                      className={inputClass}
                    >
                      {VIAL_SIZES.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                    {newVialSize === "Custom…" && (
                      <input
                        type="text"
                        placeholder="e.g. 2.5 mg, not specified…"
                        value={newVialSizeCustom}
                        onChange={(e) => setNewVialSizeCustom(e.target.value)}
                        className={inputClass + " mt-2"}
                        autoFocus
                      />
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Quantity (vials)</label>
                    <select
                      value={newQty}
                      onChange={(e) => setNewQty(parseInt(e.target.value))}
                      className={inputClass}
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((q) => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={addPeptide}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#060c18] font-semibold text-sm py-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Peptide
                </button>
              </div>

              {/* Peptide list */}
              {peptides.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="h-px bg-[hsl(var(--border))]" />
                  {peptides.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between py-2 text-sm"
                    >
                      <div>
                        <span className="font-medium text-[hsl(var(--foreground))]">{p.name}</span>
                        <span className="text-[hsl(var(--muted-foreground))] ml-2">
                          {p.vialSize} × {p.quantity}
                        </span>
                      </div>
                      <button
                        onClick={() => removePeptide(p.id)}
                        className="text-[hsl(var(--muted-foreground))] hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Supplies section */}
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-4 h-4 text-cyan-500" />
                <h2 className="text-sm font-semibold text-[hsl(var(--foreground))] uppercase tracking-wide">
                  Supplies
                </h2>
              </div>

              <div className="space-y-3">
                {supplies.map((s) => (
                  <div key={s.id} className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={s.checked}
                      onChange={(e) => updateSupply(s.id, { checked: e.target.checked })}
                      className="mt-0.5 accent-cyan-500 w-4 h-4 shrink-0 cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-medium ${s.checked ? "text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))]"}`}>
                          {s.name}
                        </span>
                        <span className="text-xs text-[hsl(var(--muted-foreground))] rounded-full border border-[hsl(var(--border))] px-1.5 py-0.5">
                          {s.recurrence}
                        </span>
                        {s.url && (
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-cyan-500 hover:text-cyan-400 flex items-center gap-0.5"
                          >
                            Amazon <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{s.detail}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => updateSupply(s.id, { quantity: Math.max(1, s.quantity - 1) })}
                        disabled={!s.checked}
                        className="w-6 h-6 rounded flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] border border-[hsl(var(--border))] disabled:opacity-30 transition-colors text-sm leading-none"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm text-[hsl(var(--foreground))]">{s.quantity}</span>
                      <button
                        onClick={() => updateSupply(s.id, { quantity: s.quantity + 1 })}
                        disabled={!s.checked}
                        className="w-6 h-6 rounded flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] border border-[hsl(var(--border))] disabled:opacity-30 transition-colors text-sm leading-none"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeSupply(s.id)}
                        className="w-6 h-6 rounded flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-red-400 transition-colors ml-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add custom supply */}
              <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] flex gap-2">
                <input
                  type="text"
                  placeholder="Add custom item…"
                  value={newSupplyName}
                  onChange={(e) => setNewSupplyName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCustomSupply()}
                  className={inputClass + " flex-1"}
                />
                <button
                  onClick={addCustomSupply}
                  disabled={!newSupplyName.trim()}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-[hsl(var(--border))] px-3 py-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:border-cyan-500/40 disabled:opacity-30 transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: Receipt ── */}
          <div className="lg:sticky lg:top-24 self-start">
            {!hasAnyOutput ? (
              <div className="rounded-xl border border-dashed border-[hsl(var(--border))] p-10 text-center">
                <ShoppingCart className="w-8 h-8 text-[hsl(var(--muted-foreground))] mx-auto mb-3 opacity-40" />
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Add peptides or select supplies to generate your order list.
                </p>
              </div>
            ) : (
              <div>
                {/* Receipt card */}
                <div
                  id="purchase-receipt"
                  className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden"
                >
                  {/* Receipt header */}
                  <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
                    <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-widest font-mono">
                      biohack.tools
                    </p>
                    <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mt-0.5">
                      Order List
                    </h3>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                      {new Date().toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Peptide vendor section */}
                  {peptides.length > 0 && (
                    <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
                      <p className="text-xs font-semibold text-cyan-500 uppercase tracking-widest mb-3">
                        Peptide Vendor{vendorName ? `: ${vendorName}` : ""}
                      </p>
                      <div className="space-y-2">
                        {peptides.map((p) => (
                          <div key={p.id} className="flex items-center justify-between text-sm">
                            <span className="text-[hsl(var(--foreground))]">{p.name}</span>
                            <span className="text-[hsl(var(--muted-foreground))] font-mono tabular-nums">
                              {p.vialSize} × {p.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Supplies section */}
                  {checkedSupplies.length > 0 && (
                    <div className="px-5 py-4">
                      <p className="text-xs font-semibold text-cyan-500 uppercase tracking-widest mb-3">
                        Supplies
                      </p>
                      <div className="space-y-2">
                        {checkedSupplies.map((s) => (
                          <div key={s.id} className="flex items-center justify-between text-sm gap-3">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="text-[hsl(var(--foreground))] truncate">{s.name}</span>
                              {s.url && (
                                <a
                                  href={s.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="shrink-0 text-cyan-500 hover:text-cyan-400"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                            <span className="text-[hsl(var(--muted-foreground))] font-mono tabular-nums shrink-0">
                              ×{s.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Print button */}
                <button
                  onClick={() => window.print()}
                  className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-cyan-500/40 hover:text-[hsl(var(--foreground))] text-[hsl(var(--muted-foreground))] text-sm font-medium py-2.5 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save as PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
