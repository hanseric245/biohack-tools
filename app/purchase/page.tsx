import { PurchaseOrderBuilder } from "@/components/purchase/PurchaseOrderBuilder";

export const metadata = {
  title: "Purchase — biohack.tools",
  description: "Generate your peptide vendor and supply order lists.",
};

export default function PurchasePage() {
  return <PurchaseOrderBuilder />;
}
