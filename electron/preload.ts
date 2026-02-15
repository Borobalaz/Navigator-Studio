import { ipcRenderer, contextBridge } from 'electron'
import fs from "fs";
import path from "path";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})

contextBridge.exposeInMainWorld("api", {
  readFolder: async (relativePath: string) => {
    const fullPath = path.resolve(relativePath);
    console.log("Reading folder:", fullPath);

    const dirents = await fs.promises.readdir(fullPath, {
      withFileTypes: true,
    });

    return dirents.map((d) => ({
      name: d.name,
      isDirectory: d.isDirectory(),
    }));
  },

  openFolder: async (relativePath: string) => {
    const fullPath = path.resolve(relativePath);
    await ipcRenderer.invoke("open-folder", fullPath);
  },

  copyFileToFolder: async (folderPath: string, file: File) => {
    const fullFolderPath = path.resolve(folderPath);
    const filePath = path.join(fullFolderPath, file.name);

    // Read file as buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Write to destination
    await fs.promises.writeFile(filePath, buffer);
    console.log(`File copied to ${filePath}`);
  },
  
  runExe: (exePath: string) => ipcRenderer.invoke("run-executable", exePath),
  onStdout: (callback: (data: string) => void) =>
    ipcRenderer.on("exe-stdout", (_e, data) => callback(data)),
  onStderr: (callback: (data: string) => void) =>
    ipcRenderer.on("exe-stderr", (_e, data) => callback(data)),
  removeListener: (channel: string, callback: (...args: any[]) => void) =>
    ipcRenderer.removeListener(channel, callback),
  maximize: () => ipcRenderer.invoke("maximize-window"),
  minimize: () => ipcRenderer.invoke("minimize-window"),
  close: () => ipcRenderer.invoke("close-window"),
});

