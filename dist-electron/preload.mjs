import { contextBridge as a, ipcRenderer as r } from "electron";
import l from "fs";
import i from "path";
a.exposeInMainWorld("ipcRenderer", {
  on(...e) {
    const [o, n] = e;
    return r.on(o, (t, ...s) => n(t, ...s));
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
a.exposeInMainWorld("api", {
  readFolder: async (e) => {
    const o = i.resolve(e);
    return console.log("Reading folder:", o), (await l.promises.readdir(o, {
      withFileTypes: !0
    })).map((t) => ({
      name: t.name,
      isDirectory: t.isDirectory()
    }));
  },
  openFolder: async (e) => {
    const o = i.resolve(e);
    await r.invoke("open-folder", o);
  },
  copyFileToFolder: async (e, o) => {
    const n = i.resolve(e), t = i.join(n, o.name), s = await o.arrayBuffer(), d = Buffer.from(s);
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
a.exposeInMainWorld("updater", {
  onStatus: (e) => r.on("update-status", (o, n) => e(n)),
  onProgress: (e) => r.on("update-progress", (o, n) => e(n)),
  onReady: (e) => r.on("update-ready", () => e())
});
