var u = Object.defineProperty;
var m = (e, r, n) => r in e ? u(e, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[r] = n;
var l = (e, r, n) => m(e, typeof r != "symbol" ? r + "" : r, n);
import { contextBridge as c, ipcRenderer as o } from "electron";
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
    const [r, n] = e;
    return o.on(r, (t, ...a) => n(t, ...a));
  },
  off(...e) {
    const [r, ...n] = e;
    return o.off(r, ...n);
  },
  send(...e) {
    const [r, ...n] = e;
    return o.send(r, ...n);
  },
  invoke(...e) {
    const [r, ...n] = e;
    return o.invoke(r, ...n);
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
    return (await i.promises.readdir(r, { withFileTypes: !0 })).map((t) => ({
      name: t.name,
      isDirectory: t.isDirectory()
    }));
  },
  getPublicPath: (...e) => o.invoke("get-public-path", ...e),
  openFolder: async (e) => {
    const r = s.resolve(e);
    await o.invoke("open-folder", r);
  },
  copyFileToFolder: async (e, r) => {
    const n = s.resolve(e), t = s.join(n, r.name), a = await r.arrayBuffer(), d = Buffer.from(a);
    await i.promises.writeFile(t, d), f.emit();
  },
  runExe: (e, r) => o.invoke("run-executable", e, r || []),
  onStdout: (e) => o.on("exe-stdout", (r, n) => e(n)),
  onStderr: (e) => o.on("exe-stderr", (r, n) => e(n)),
  removeListener: (e, r) => o.removeListener(e, r),
  maximize: () => o.invoke("maximize-window"),
  minimize: () => o.invoke("minimize-window"),
  close: () => o.invoke("close-window"),
  openFile: (e) => o.invoke("open-file", e)
});
c.exposeInMainWorld("updater", {
  onStatus: (e) => o.on("update-status", (r, n) => e(n)),
  onProgress: (e) => o.on("update-progress", (r, n) => e(n)),
  onReady: (e) => o.on("update-ready", () => e()),
  onError: (e) => o.on("update-error", (r, n) => e(n)),
  checkForUpdates: () => o.invoke("check-for-updates"),
  restartAndInstall: () => o.invoke("restart-and-install")
});
