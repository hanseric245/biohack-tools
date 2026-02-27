import { PeptideCalculator } from "@/app/components/PeptideCalculator";

export const metadata = {
  title: "Plan — biohack.tools",
  description: "Calculate reconstitution, draw volumes, and supply duration for your peptide protocol.",
};

export default function PlanPage() {
  return <PeptideCalculator />;
}
