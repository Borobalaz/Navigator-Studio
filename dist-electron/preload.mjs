import { contextBridge, ipcRenderer } from "electron";
import fs from "fs";
import path from "path";
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  }
  // You can expose other APTs you need here.
  // ...
});
contextBridge.exposeInMainWorld("api", {
  readFolder: async (relativePath) => {
    const fullPath = path.resolve(relativePath);
    console.log("Reading folder:", fullPath);
    const dirents = await fs.promises.readdir(fullPath, {
      withFileTypes: true
    });
    return dirents.map((d) => ({
      name: d.name,
      isDirectory: d.isDirectory()
    }));
  },
  openFolder: async (relativePath) => {
    const fullPath = path.resolve(relativePath);
    await ipcRenderer.invoke("open-folder", fullPath);
  },
  copyFileToFolder: async (folderPath, file) => {
    const fullFolderPath = path.resolve(folderPath);
    const filePath = path.join(fullFolderPath, file.name);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.promises.writeFile(filePath, buffer);
    console.log(`File copied to ${filePath}`);
  },
  runExe: (exePath) => ipcRenderer.invoke("run-executable", exePath),
  onStdout: (callback) => ipcRenderer.on("exe-stdout", (_e, data) => callback(data)),
  onStderr: (callback) => ipcRenderer.on("exe-stderr", (_e, data) => callback(data)),
  removeListener: (channel, callback) => ipcRenderer.removeListener(channel, callback),
  maximize: () => ipcRenderer.invoke("maximize-window"),
  minimize: () => ipcRenderer.invoke("minimize-window"),
  close: () => ipcRenderer.invoke("close-window")
});
