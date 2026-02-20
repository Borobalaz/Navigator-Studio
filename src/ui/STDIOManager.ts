type StdType = "stdout" | "stderr";

export interface StdEntry {
  id: string;
  type: StdType;
  text: string;
  ts: number;
}

type Listener = (entries: StdEntry[]) => void;

class STDIOManager {
  private entries: StdEntry[] = [];
  private listeners = new Set<Listener>();

  constructor() {
    // Bind to preload API if available
    const api = (window as any).api;
    if (api && typeof api.onStdout === "function") {
      api.onStdout((data: string) => this.push("stdout", data));
    }
    if (api && typeof api.onStderr === "function") {
      api.onStderr((data: string) => this.push("stderr", data));
    }
  }

  private notify() {
    const snapshot = [...this.entries];
    for (const l of this.listeners) l(snapshot);
  }

  push(type: StdType, text: string) {
    const entry: StdEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      type,
      text,
      ts: Date.now(),
    };
    this.entries.push(entry);
    this.notify();
    return entry;
  }

  getEntries() {
    return [...this.entries];
  }

  clear() {
    this.entries = [];
    this.notify();
  }

  subscribe(cb: Listener) {
    this.listeners.add(cb);
    // immediately send current state
    cb(this.getEntries());
    return () => { this.listeners.delete(cb); };
  }
}

export const stdioManager = new STDIOManager();
