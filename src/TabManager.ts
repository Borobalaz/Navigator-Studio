export type Tab = {
  label: string;
  component: React.ComponentType<any>;
  props?: any;
};

type Listener = () => void;

export class TabManager {
  private tabs: Tab[] = [];
  private activeTab : Tab | null = null;

  private listeners = {
    tabsChange: [] as Listener[],
    activeTabChange: [] as Listener[],
  };


  constructor(initialTabs: Tab[] = []) {
    this.tabs = initialTabs;
  }

  addTab(tab: Tab): void {
    this.tabs.push(tab);
    this.notify("tabsChange");
    console.log("added tab");
  }

  removeTab(label: string): void {
    this.tabs = this.tabs.filter(t => t.label !== label);
    if(this.activeTab && !this.tabs.includes(this.activeTab) && this.tabs.length > 0) {
      this.activeTab = this.tabs[0];
    }
    this.notify("tabsChange");
  }

  getTabs(): Tab[] {
    return [...this.tabs];
  }

  getTabByLabel(label: string): Tab | undefined {
    return this.tabs.find(t => t.label === label);
  }

  getTabByIndex(index: number): Tab | undefined {
    return this.tabs[index];
  }

  clear(): void {
    this.tabs = [];
    this.notify("tabsChange");
  }

  // -----------------------
  // EVENTS
  // -----------------------

  private async notify(event: keyof typeof this.listeners) {
    this.listeners[event].forEach(cb => cb());
  }

  on(event: keyof typeof this.listeners, cb: Listener) {
    this.listeners[event].push(cb);
  }

  off(event: keyof typeof this.listeners, callback: Listener) {
    this.listeners[event] = this.listeners[event].filter(
      (cb) => cb !== callback
    );
  }
}

export const tabManager = new TabManager();