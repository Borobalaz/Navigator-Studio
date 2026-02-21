var u = Object.defineProperty;
var m = (o, e, r) => e in o ? u(o, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : o[e] = r;
var c = (o, e, r) => m(o, typeof e != "symbol" ? e + "" : e, r);
import { contextBridge as l, ipcRenderer as n } from "electron";
import s from "fs";
import i from "path";
class p {
  constructor() {
    c(this, "listeners", /* @__PURE__ */ new Set());
  }
  subscribe(e) {
    return this.listeners.add(e), () => {
      this.listeners.delete(e);
    };
  }
  emit() {
    for (const e of this.listeners) e();
  }
}
const f = new p();
l.exposeInMainWorld("ipcRenderer", {
  on(...o) {
    const [e, r] = o;
    return n.on(e, (t, ...a) => r(t, ...a));
  },
  off(...o) {
    const [e, ...r] = o;
    return n.off(e, ...r);
  },
  send(...o) {
    const [e, ...r] = o;
    return n.send(e, ...r);
  },
  invoke(...o) {
    const [e, ...r] = o;
    return n.invoke(e, ...r);
  }
  // You can expose other APTs you need here.
  // ...
});
l.exposeInMainWorld("api", {
  readFolder: async (o) => {
    const e = i.resolve(o);
    console.log("Reading folder:", e);
    try {
      await s.promises.access(e, s.constants.R_OK);
    } catch {
      await s.promises.mkdir(e, { recursive: !0 }), console.log("Folder created:", e);
    }
    return (await s.promises.readdir(e, { withFileTypes: !0 })).map((t) => ({
      name: t.name,
      isDirectory: t.isDirectory()
    }));
  },
  getPublicPath: (...o) => n.invoke("get-public-path", ...o),
  openFolder: async (o) => {
    const e = i.resolve(o);
    await n.invoke("open-folder", e);
  },
  copyFileToFolder: async (o, e) => {
    const r = i.resolve(o), t = i.join(r, e.name), a = await e.arrayBuffer(), d = Buffer.from(a);
    await s.promises.writeFile(t, d), f.emit(), console.log(`File copied to ${t}`);
  },
  runExe: (o, e) => n.invoke("run-executable", o, e || []),
  onStdout: (o) => n.on("exe-stdout", (e, r) => o(r)),
  onStderr: (o) => n.on("exe-stderr", (e, r) => o(r)),
  removeListener: (o, e) => n.removeListener(o, e),
  maximize: () => n.invoke("maximize-window"),
  minimize: () => n.invoke("minimize-window"),
  close: () => n.invoke("close-window")
});
l.exposeInMainWorld("updater", {
  onStatus: (o) => n.on("update-status", (e, r) => o(r)),
  onProgress: (o) => n.on("update-progress", (e, r) => o(r)),
  onReady: (o) => n.on("update-ready", () => o()),
  onError: (o) => n.on("update-error", (e, r) => o(r)),
  checkForUpdates: () => n.invoke("check-for-updates"),
  restartAndInstall: () => n.invoke("restart-and-install")
});
