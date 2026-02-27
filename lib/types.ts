// ── Calculator ────────────────────────────────────────────────────────────────

export type DoseUnit = "mcg" | "mg";
export type SyringeType = "U-100" | "U-50" | "U-40";

export interface CalculatorResults {
  bwUsed: number;
  bwOverridden: boolean;
  concentration: number;
  volumeMl: number;
  syringeUnits: number;
  totalDoses: number;
  supplyLabel: string | null;
  frequencyLabel: string | null;
  reconstitution: string;
  drawInstruction: string;
  summary: string;
}

// ── Protocol ──────────────────────────────────────────────────────────────────

export type ProtocolStatus = "active" | "completed" | "paused";

export interface Protocol {
  id: string;
  name: string;
  startDate: string;       // ISO date string
  endDate: string | null;
  status: ProtocolStatus;
  notes: string;
  userId: string;          // "local" for localStorage; real ID when accounts added
  createdAt: string;
  updatedAt: string;
}

export interface ProtocolItem {
  id: string;
  protocolId: string;
  peptideName: string;
  vialSizeMg: number;
  bwAmountMl: number;
  // concentration is derived: vialSizeMg / bwAmountMl — do not store
  doseMg: number;
  doseUnit: DoseUnit;
  frequencyDosesPerWeek: number;
  syringeType: SyringeType;
  // syringeUnits is derived — do not store
  numVials: number;
  createdAt: string;
  updatedAt: string;
}

// ── Reconstitution ────────────────────────────────────────────────────────────

export interface ReconstitutionEvent {
  id: string;
  protocolItemId: string;
  reconstitutedAt: string;   // ISO date string
  // expiresAt is derived: reconstitutedAt + 28 days — do not store
  batchNotes: string;
  createdAt: string;
}

// ── Injection Log ─────────────────────────────────────────────────────────────

export type InjectionSite = "abdomen" | "thigh" | "arm" | "flank";

export interface LogEntry {
  id: string;
  protocolId: string;
  protocolItemId: string;
  scheduledAt: string;             // ISO date string
  administeredAt: string | null;   // null = not yet done
  doseActualMg: number | null;     // if different from protocol dose
  site: InjectionSite | null;
  notes: string;
  createdAt: string;
}

// ── Orders ────────────────────────────────────────────────────────────────────

export type VendorType = "peptide-provider" | "amazon" | "pharmacy" | "other";
export type OrderItemType = "peptide" | "supply";
export type SupplyRecurrence = "one-time" | "recurring";

export interface Order {
  id: string;
  protocolId: string;
  createdAt: string;
}

export interface OrderLineItem {
  id: string;
  orderId: string;
  type: OrderItemType;
  name: string;
  quantity: number;
  unit: string;              // "vials", "boxes", "units"
  vendor: VendorType;
  url: string | null;
  notes: string;
  recurrence: SupplyRecurrence;
}

// ── localStorage root schema ──────────────────────────────────────────────────

export interface LocalStore {
  protocols: Protocol[];
  protocolItems: ProtocolItem[];
  reconstitutionEvents: ReconstitutionEvent[];
  logEntries: LogEntry[];
  orders: Order[];
  orderLineItems: OrderLineItem[];
}
