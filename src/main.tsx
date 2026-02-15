import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './ui/App.tsx'
import './index.css'

declare global {
  interface Window {
    ipcRenderer: any
    api: any
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
