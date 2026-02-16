import { contextBridge as s, ipcRenderer as r } from "electron";
import l from "fs";
import i from "path";
s.exposeInMainWorld("ipcRenderer", {
  on(...e) {
    const [o, n] = e;
    return r.on(o, (t, ...a) => n(t, ...a));
  },
  off(...e) {
    const [o, ...n] = e;
    return r.off(o, ...n);
  },
  send(...e) {
    const [o, ...n] = e;
    return r.send(o, ...n);
  },
  invoke(...e) {
    const [o, ...n] = e;
    return r.invoke(o, ...n);
  }
  // You can expose other APTs you need here.
  // ...
});
s.exposeInMainWorld("api", {
  readFolder: async (e) => {
    const o = i.resolve(e);
    return console.log("Reading folder:", o), (await l.promises.readdir(o, {
      withFileTypes: !0
    })).map((t) => ({
      name: t.name,
      isDirectory: t.isDirectory()
    }));
  },
  getPublicPath: (...e) => r.invoke("get-public-path", ...e),
  openFolder: async (e) => {
    const o = i.resolve(e);
    await r.invoke("open-folder", o);
  },
  copyFileToFolder: async (e, o) => {
    const n = i.resolve(e), t = i.join(n, o.name), a = await o.arrayBuffer(), d = Buffer.from(a);
    await l.promises.writeFile(t, d), console.log(`File copied to ${t}`);
  },
  runExe: (e) => r.invoke("run-executable", e),
  onStdout: (e) => r.on("exe-stdout", (o, n) => e(n)),
  onStderr: (e) => r.on("exe-stderr", (o, n) => e(n)),
  removeListener: (e, o) => r.removeListener(e, o),
  maximize: () => r.invoke("maximize-window"),
  minimize: () => r.invoke("minimize-window"),
  close: () => r.invoke("close-window")
});
s.exposeInMainWorld("updater", {
  onStatus: (e) => r.on("update-status", (o, n) => e(n)),
  onProgress: (e) => r.on("update-progress", (o, n) => e(n)),
  onReady: (e) => r.on("update-ready", () => e()),
  onError: (e) => r.on("update-error", (o, n) => e(n)),
  checkForUpdates: () => r.invoke("check-for-updates"),
  restartAndInstall: () => r.invoke("restart-and-install")
});
