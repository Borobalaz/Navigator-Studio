import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './ui/App.tsx'
import './index.css'
import './screens/ScreenBase.css'

declare global {
  interface Window {
    ipcRenderer: any
    api: {
      readFolder: (path: string) => Promise<{name: string; isDirectory: boolean}[]>;
      getPublicPath: (...segments: string[]) => Promise<string>;
      openFolder: (path: string) => Promise<void>;
      copyFileToFolder: (folderPath: string, file: File) => Promise<void>;
      runExe: (exePath: string, args?: string[]) => Promise<string>;
      onStdout: (callback: (data: string) => void) => void;
      onStderr: (callback: (data: string) => void) => void;
      removeListener: (channel: string, callback: (...args: any[]) => void) => void;
      maximize: () => Promise<void>;
      minimize: () => Promise<void>;
      close: () => Promise<void>;
      openFile: (path: string) => Promise<boolean>;
      selectFolder: (defaultPath?: string) => Promise<string | null>;
      readBinaryFile: (filePath: string) => Promise<Uint8Array>;
      createSchematicPdf: (request: {
        companyId: string;
        templateId: string;
        payload: Record<string, any>;
        outputPath: string;
        autoOpen?: boolean;
      }) => Promise<{
        success: boolean;
        outputPath?: string;
        pageCount?: number;
        error?: string;
      }>;
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event: any, message: any) => {
  console.log(message)
})
