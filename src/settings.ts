
class Settings {

  private settings: Record<string, any> = {};

  private listeners: Record<string, ((value: any) => void)[]> = {};

  constructor() {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("navigator-studio-settings");
    if (savedSettings) {
      try {
        this.settings = JSON.parse(savedSettings);
      } catch (e) {
        console.error("Failed to parse settings from localStorage:", e);
      }
    }
  }

  set(key: string, value: any): void {
    this.settings[key] = value; 
    this.notifyChange(key, value);
    // Save settings to localStorage
    localStorage.setItem("navigator-studio-settings", JSON.stringify(this.settings));
  }

  get(key: string, defaultValue: any = null): any {
    return this.settings[key] !== undefined ? this.settings[key] : defaultValue;
  }

  onChange(key: string, callback: (value: any) => void): void {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);
  }
  offChange(key: string, callback: (value: any) => void): void {
    if (!this.listeners[key]) return;
    this.listeners[key] = this.listeners[key].filter((cb) => cb !== callback);
  }

  notifyChange(key: string, value: any): void {
    if (this.listeners[key]) {
      this.listeners[key].forEach((callback) => callback(value));
    }
  }
}

export const globalSettings = new Settings();