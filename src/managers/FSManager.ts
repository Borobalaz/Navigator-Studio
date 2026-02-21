

type FsListener = () => void;

class FSManager {
  private listeners = new Set<FsListener>();
  constructor() {
  }
  
  subscribe(cb: FsListener) {
    this.listeners.add(cb);
    return () => {this.listeners.delete(cb);}
  }
  emit() {
    for (const l of this.listeners) l();
  }
}

export const fsManager = new FSManager();