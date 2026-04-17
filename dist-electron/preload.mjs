var u = Object.defineProperty;
var m = (e, r, t) => r in e ? u(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var l = (e, r, t) => m(e, typeof r != "symbol" ? r + "" : r, t);
import { contextBridge as c, ipcRenderer as n } from "electron";
import i from "fs";
import s from "path";
class p {
  constructor() {
    l(this, "listeners", /* @__PURE__ */ new Set());
  }
  subscribe(r) {
    return this.listeners.add(r), () => {
      this.listeners.delete(r);
    };
  }
  emit() {
    for (const r of this.listeners) r();
  }
}
const f = new p();
c.exposeInMainWorld("ipcRenderer", {
  on(...e) {
    const [r, t] = e;
    return n.on(r, (o, ...a) => t(o, ...a));
  },
  off(...e) {
    const [r, ...t] = e;
    return n.off(r, ...t);
  },
  send(...e) {
    const [r, ...t] = e;
    return n.send(r, ...t);
  },
  invoke(...e) {
    const [r, ...t] = e;
    return n.invoke(r, ...t);
  }
  // You can expose other APTs you need here.
  // ...
});
c.exposeInMainWorld("api", {
  readFolder: async (e) => {
    const r = s.resolve(e);
    try {
      await i.promises.access(r, i.constants.R_OK);
    } catch {
      await i.promises.mkdir(r, { recursive: !0 });
    }
    return (await i.promises.readdir(r, { withFileTypes: !0 })).map((o) => ({
      name: o.name,
      isDirectory: o.isDirectory()
    }));
  },
  getPublicPath: (...e) => n.invoke("get-public-path", ...e),
  openFolder: async (e) => {
    const r = s.resolve(e);
    await n.invoke("open-folder", r);
  },
  copyFileToFolder: async (e, r) => {
    const t = s.resolve(e), o = s.join(t, r.name), a = await r.arrayBuffer(), d = Buffer.from(a);
    await i.promises.writeFile(o, d), f.emit();
  },
  runExe: (e, r) => n.invoke("run-executable", e, r || []),
  onStdout: (e) => n.on("exe-stdout", (r, t) => e(t)),
  onStderr: (e) => n.on("exe-stderr", (r, t) => e(t)),
  removeListener: (e, r) => n.removeListener(e, r),
  maximize: () => n.invoke("maximize-window"),
  minimize: () => n.invoke("minimize-window"),
  close: () => n.invoke("close-window"),
  openFile: (e) => n.invoke("open-file", e),
  selectFolder: (e) => n.invoke("select-folder", e),
  readBinaryFile: async (e) => {
    const r = s.resolve(e), t = await i.promises.readFile(r);
    return Uint8Array.from(t);
  },
  createSchematicPdf: (e) => n.invoke("pdf-create-schematic", e)
});
c.exposeInMainWorld("updater", {
  onStatus: (e) => n.on("update-status", (r, t) => e(t)),
  onProgress: (e) => n.on("update-progress", (r, t) => e(t)),
  onReady: (e) => n.on("update-ready", () => e()),
  onError: (e) => n.on("update-error", (r, t) => e(t)),
  checkForUpdates: () => n.invoke("check-for-updates"),
  getState: () => n.invoke("get-update-state"),
  restartAndInstall: () => n.invoke("restart-and-install")
});
