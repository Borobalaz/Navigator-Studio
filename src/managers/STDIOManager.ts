type StdType = "stdout" | "stderr";

export interface StdEntry {
  id: string;
  type: StdType;
  text: string;
  ts: number;
}

type StdListener = (entry: StdEntry | null) => void;

class STDIOManager {
  private entries: StdEntry[] = [];
  private listeners = new Set<StdListener>();

  constructor() {
    const api = (window as any).api;
    if (api && typeof api.onStdout === "function") {
      api.onStdout((data: string) => this.push("stdout", data));
    }
    if (api && typeof api.onStderr === "function") {
      api.onStderr((data: string) => this.push("stderr", data));
    }
  }

  private notify(entry: StdEntry | null) {
    if (!entry) {
      for (const l of this.listeners) l(null);
      return;
    }
    for (const l of this.listeners) l(entry);
  }

  push(type: StdType, text: string) {
    if (type === "stdout") {
      // Split concatenated JSON objects (handles multiple JSON in one write)
      const parts = text.split(/(?<=})\s*(?={)/);

      const entries: StdEntry[] = parts.map(part => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        type,
        text: part,
        ts: Date.now(),
      }));

      // Store and notify each entry
      for (const entry of entries) {
        this.entries.push(entry);
        this.notify(entry);
      }

      return entries;
    } else {
      const entry: StdEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        type,
        text,
        ts: Date.now(),
      };
      this.entries.push(entry);
      this.notify(entry);
      return [entry];
    }
  }

  getEntries() {
    return [...this.entries];
  }

  clear() {
    this.entries = [];
    this.notify(null);
  }

  subscribe(cb: StdListener) {
    this.listeners.add(cb);
    return () => { this.listeners.delete(cb); };
  }
}

export const stdioManager = new STDIOManager();