"use client";

import { useState, useMemo } from "react";

type DoseUnit = "mcg" | "mg";
type SyringeType = "U-100" | "U-50" | "U-40";

const SYRINGE_UNITS: Record<SyringeType, number> = {
  "U-100": 100,
  "U-50": 50,
  "U-40": 40,
};

interface Results {
  concentration: number;
  volumeMl: number;
  syringeUnits: number;
  summary: string;
}

function compute(
  vialMg: number,
  waterMl: number,
  syringe: SyringeType,
  dose: number,
  doseUnit: DoseUnit
): Results | null {
  if (!vialMg || !waterMl || !dose || vialMg <= 0 || waterMl <= 0 || dose <= 0) return null;

  const doseMg = doseUnit === "mcg" ? dose / 1000 : dose;
  const concentration = vialMg / waterMl;
  const volumeMl = doseMg / concentration;
  const unitsPerMl = SYRINGE_UNITS[syringe];
  const syringeUnits = volumeMl * unitsPerMl;

  const unitsDisplay =
    syringeUnits % 1 === 0
      ? syringeUnits.toFixed(0)
      : syringeUnits.toFixed(1);

  const summary = `Draw to the ${unitsDisplay} unit mark on your ${syringe} syringe.`;

  return { concentration, volumeMl, syringeUnits, summary };
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="text-sm font-semibold tracking-widest text-slate-300 uppercase">
          {label}
        </span>
        {hint && (
          <p className="mt-0.5 text-sm text-slate-500 leading-snug">{hint}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function NumericInput({
  label,
  hint,
  value,
  onChange,
  unit,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
  placeholder?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "0"}
          min="0"
          step="any"
          className="
            w-full bg-[#081322] border border-[#1a3050] rounded-xl
            px-5 py-4 text-slate-100 text-xl font-mono
            placeholder:text-slate-600
            focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20
            transition-colors duration-150
          "
          style={{ paddingRight: unit ? "3.5rem" : undefined }}
        />
        {unit && (
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-base text-slate-500 font-mono pointer-events-none">
            {unit}
          </span>
        )}
      </div>
    </Field>
  );
}

function ResultCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 bg-[#081322] border border-[#1a3050] rounded-xl px-4 py-3">
      <span className="text-xs font-semibold tracking-widest text-slate-600 uppercase">
        {label}
      </span>
      <span className="text-lg font-mono font-medium text-slate-400 tracking-tight">
        {value}
      </span>
      {sub && <span className="text-xs text-slate-600">{sub}</span>}
    </div>
  );
}

export default function PeptideCalculator() {
  const [vialMg, setVialMg] = useState("10");
  const [waterMl, setWaterMl] = useState("2");
  const [syringe, setSyringe] = useState<SyringeType>("U-100");
  const [dose, setDose] = useState("");
  const [doseUnit, setDoseUnit] = useState<DoseUnit>("mcg");
  const [calcName, setCalcName] = useState("");

  const results = useMemo(
    () =>
      compute(
        parseFloat(vialMg),
        parseFloat(waterMl),
        syringe,
        parseFloat(dose),
        doseUnit
      ),
    [vialMg, waterMl, syringe, dose, doseUnit]
  );

  const hasResults = results !== null;

  const printDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* ── Screen UI ── */}
      <div className="min-h-screen bg-[#060c18] px-5 py-10 sm:py-16 print:hidden">
        {/* Header */}
        <header className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase font-semibold">
              biohack.tools
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 tracking-tight leading-tight">
            Peptide Dosage
            <br />
            <span className="text-cyan-400">Calculator</span>
          </h1>
          <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
            Enter your vial specs and intended dose to get the exact volume and
            syringe unit mark.
          </p>
        </header>

        <main className="max-w-2xl mx-auto">
          <div className="bg-[#0c1a2e] border border-[#1a3050] rounded-2xl">
            {/* Inputs section */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-7">
                <div className="w-1 h-5 bg-cyan-400 rounded-full" />
                <h2 className="text-sm font-semibold tracking-widest text-slate-400 uppercase">
                  Inputs
                </h2>
              </div>

              <div className="flex flex-col gap-6">
                {/* Peptide name */}
                <Field
                  label="Peptide Name"
                  hint="Optional. Names your printed reference card — e.g. BPC-157, TB-500."
                >
                  <input
                    type="text"
                    value={calcName}
                    onChange={(e) => setCalcName(e.target.value)}
                    placeholder="e.g. BPC-157"
                    className="
                      w-full bg-[#081322] border border-[#1a3050] rounded-xl
                      px-5 py-4 text-slate-100 text-xl
                      placeholder:text-slate-600
                      focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20
                      transition-colors duration-150
                    "
                  />
                </Field>

                <NumericInput
                  label="Bacteriostatic Water Added"
                  hint="ml = milliliters, same as cc. How much bacteriostatic water you inject into the vial."
                  value={waterMl}
                  onChange={setWaterMl}
                  unit="ml"
                  placeholder="2"
                />
                <NumericInput
                  label="Vial Peptide Amount"
                  hint="mg = milligrams — the total peptide amount printed on your vial label (e.g. 5mg, 10mg)."
                  value={vialMg}
                  onChange={setVialMg}
                  unit="mg"
                  placeholder="5"
                />

                {/* Syringe type */}
                <Field
                  label="Syringe Type"
                  hint="U-100 is the standard insulin syringe — 100 units per ml. Most peptide users use U-100."
                >
                  <select
                    value={syringe}
                    onChange={(e) => setSyringe(e.target.value as SyringeType)}
                    className="
                      w-full bg-[#081322] border border-[#1a3050] rounded-xl
                      px-5 py-4 text-slate-100 text-xl
                      focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20
                      transition-colors duration-150 cursor-pointer
                    "
                  >
                    <option value="U-100">U-100 (100 units / ml)</option>
                    <option value="U-50">U-50 (50 units / ml)</option>
                    <option value="U-40">U-40 (40 units / ml)</option>
                  </select>
                </Field>

                {/* Dose with unit toggle */}
                <Field
                  label="Intended Dose"
                  hint="mcg = micrograms, mg = milligrams. 1mg = 1,000mcg. Most peptide doses are in mcg."
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex bg-[#081322] border border-[#1a3050] rounded-xl overflow-hidden self-start">
                      {(["mcg", "mg"] as DoseUnit[]).map((u) => (
                        <button
                          key={u}
                          onClick={() => setDoseUnit(u)}
                          className={`
                            px-5 py-2.5 text-base font-mono font-medium transition-colors duration-150
                            ${
                              doseUnit === u
                                ? "bg-cyan-400/10 text-cyan-400"
                                : "text-slate-500 hover:text-slate-300"
                            }
                          `}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      value={dose}
                      onChange={(e) => setDose(e.target.value)}
                      placeholder="Example: 250. Enter your amount here."
                      min="0"
                      step="any"
                      className="
                        w-full bg-[#081322] border border-[#1a3050] rounded-xl
                        px-5 py-4 text-slate-100 text-xl font-mono
                        placeholder:text-slate-600
                        focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20
                        transition-colors duration-150
                      "
                    />
                  </div>
                </Field>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#1a3050]" />

            {/* Results section */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-7">
                <div
                  className={`w-1 h-5 rounded-full transition-colors duration-300 ${
                    hasResults ? "bg-cyan-400" : "bg-slate-600"
                  }`}
                />
                <h2 className="text-sm font-semibold tracking-widest text-slate-400 uppercase">
                  Results
                </h2>
              </div>

              {!hasResults ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-[#1a3050] flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-500 text-base">
                    Fill in all inputs to calculate
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* Summary */}
                  <div className="bg-cyan-400/10 border border-cyan-400/40 rounded-xl px-6 py-5">
                    <p className="text-cyan-100 text-2xl leading-snug font-bold">
                      {results.summary}
                    </p>
                  </div>

                  {/* Supporting data */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <ResultCard
                      label="Concentration"
                      value={`${results.concentration.toFixed(4)} mg/ml`}
                    />
                    <ResultCard
                      label="Draw Volume"
                      value={`${results.volumeMl.toFixed(4)} ml`}
                    />
                    <ResultCard
                      label="Syringe Units"
                      value={`${results.syringeUnits.toFixed(1)}`}
                      sub={`on ${syringe} syringe`}
                    />
                  </div>

                  {/* Print button */}
                  <button
                    onClick={() => window.print()}
                    className="
                      mt-2 w-full flex items-center justify-center gap-2
                      border border-slate-600 hover:border-cyan-400 hover:text-cyan-400
                      text-slate-400 text-base font-medium rounded-xl px-5 py-3.5
                      transition-colors duration-150
                    "
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print / Save as PDF
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-600 leading-relaxed px-4">
            For informational purposes only. Always verify calculations before use.
            Consult a healthcare professional for medical guidance.
          </p>
        </main>
      </div>

      {/* ── Print card — hidden on screen, shown when printing ── */}
      {hasResults && (
        <div className="hidden print:block p-10 font-sans text-black">
          <div className="border-2 border-black rounded-xl p-8 max-w-lg mx-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-300">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-gray-500">
                  biohack.tools
                </p>
                <p className="text-xs text-gray-400">Peptide Dosage Calculator</p>
              </div>
              <p className="text-xs text-gray-400">{printDate}</p>
            </div>

            {/* Name */}
            <h1 className="text-3xl font-bold text-black mb-6">
              {calcName || "Peptide Dosage Reference"}
            </h1>

            {/* Inputs */}
            <div className="mb-6">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">
                Inputs
              </p>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Bacteriostatic Water", `${waterMl} ml`],
                    ["Vial Peptide Amount", `${vialMg} mg`],
                    ["Syringe Type", syringe],
                    ["Intended Dose", `${dose} ${doseUnit}`],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b border-gray-100">
                      <td className="py-2 text-gray-500">{label}</td>
                      <td className="py-2 font-mono font-semibold text-right">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Result */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-5">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
                Result
              </p>
              <p className="text-2xl font-bold text-black leading-snug">
                {results!.summary}
              </p>
            </div>

            {/* Supporting numbers */}
            <div className="grid grid-cols-3 gap-3 text-sm">
              {[
                ["Concentration", `${results!.concentration.toFixed(4)} mg/ml`],
                ["Draw Volume", `${results!.volumeMl.toFixed(4)} ml`],
                ["Syringe Units", `${results!.syringeUnits.toFixed(1)}`],
              ].map(([label, value]) => (
                <div key={label} className="border border-gray-200 rounded-lg px-3 py-2">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
                  <p className="font-mono font-semibold text-black">{value}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-gray-400 text-center">
              For informational purposes only. Consult a healthcare professional for medical guidance.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
