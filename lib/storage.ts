import { LocalStore } from "./types";

const STORAGE_KEY = "biohack_tools_v1";

const DEFAULT_STORE: LocalStore = {
  protocols: [],
  protocolItems: [],
  reconstitutionEvents: [],
  logEntries: [],
  orders: [],
  orderLineItems: [],
};

export function getStore(): LocalStore {
  if (typeof window === "undefined") return DEFAULT_STORE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STORE;
    return { ...DEFAULT_STORE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STORE;
  }
}

export function saveStore(store: LocalStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function updateStore(partial: Partial<LocalStore>): void {
  saveStore({ ...getStore(), ...partial });
}

export function clearStore(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
