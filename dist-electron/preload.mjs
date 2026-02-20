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
    try {
      await fs.promises.access(fullPath, fs.constants.R_OK);
    } catch {
      await fs.promises.mkdir(fullPath, { recursive: true });
      console.log("Folder created:", fullPath);
    }
    const dirents = await fs.promises.readdir(fullPath, { withFileTypes: true });
    return dirents.map((d) => ({
      name: d.name,
      isDirectory: d.isDirectory()
    }));
  },
  getPublicPath: (...segments) => ipcRenderer.invoke("get-public-path", ...segments),
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
  runExe: (exePath, args) => ipcRenderer.invoke("run-executable", exePath, args || []),
  onStdout: (callback) => ipcRenderer.on("exe-stdout", (_e, data) => callback(data)),
  onStderr: (callback) => ipcRenderer.on("exe-stderr", (_e, data) => callback(data)),
  removeListener: (channel, callback) => ipcRenderer.removeListener(channel, callback),
  maximize: () => ipcRenderer.invoke("maximize-window"),
  minimize: () => ipcRenderer.invoke("minimize-window"),
  close: () => ipcRenderer.invoke("close-window")
});
contextBridge.exposeInMainWorld("updater", {
  onStatus: (cb) => ipcRenderer.on("update-status", (_, msg) => cb(msg)),
  onProgress: (cb) => ipcRenderer.on("update-progress", (_, percent) => cb(percent)),
  onReady: (cb) => ipcRenderer.on("update-ready", () => cb()),
  onError: (cb) => ipcRenderer.on("update-error", (_, msg) => cb(msg)),
  checkForUpdates: () => ipcRenderer.invoke("check-for-updates"),
  restartAndInstall: () => ipcRenderer.invoke("restart-and-install")
});
