/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import('electron').IpcRenderer
}

export { };

declare global {
  interface Window {
    api: {
      readFolder: (
        relativePath: string
      ) => Promise<
        { name: string; isDirectory: boolean }[]
      >;
    };
    updater: {
      onStatus: (cb: (msg: string) => void) => void;
      onProgress: (cb: (percent: number) => void) => void;
      onReady: (cb: () => void) => void;
    };
  }
}
