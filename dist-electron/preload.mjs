import { contextBridge as c, ipcRenderer as n } from "electron";
import i from "fs";
import a from "path";
c.exposeInMainWorld("ipcRenderer", {
  on(...e) {
    const [o, r] = e;
    return n.on(o, (t, ...s) => r(t, ...s));
  },
  off(...e) {
    const [o, ...r] = e;
    return n.off(o, ...r);
  },
  send(...e) {
    const [o, ...r] = e;
    return n.send(o, ...r);
  },
  invoke(...e) {
    const [o, ...r] = e;
    return n.invoke(o, ...r);
  }
  // You can expose other APTs you need here.
  // ...
});
c.exposeInMainWorld("api", {
  readFolder: async (e) => {
    const o = a.resolve(e);
    console.log("Reading folder:", o);
    try {
      await i.promises.access(o, i.constants.R_OK);
    } catch {
      await i.promises.mkdir(o, { recursive: !0 }), console.log("Folder created:", o);
    }
    return (await i.promises.readdir(o, { withFileTypes: !0 })).map((t) => ({
      name: t.name,
      isDirectory: t.isDirectory()
    }));
  },
  getPublicPath: (...e) => n.invoke("get-public-path", ...e),
  openFolder: async (e) => {
    const o = a.resolve(e);
    await n.invoke("open-folder", o);
  },
  copyFileToFolder: async (e, o) => {
    const r = a.resolve(e), t = a.join(r, o.name), s = await o.arrayBuffer(), l = Buffer.from(s);
    await i.promises.writeFile(t, l), console.log(`File copied to ${t}`);
  },
  runExe: (e, o) => n.invoke("run-executable", e, o || []),
  onStdout: (e) => n.on("exe-stdout", (o, r) => e(r)),
  onStderr: (e) => n.on("exe-stderr", (o, r) => e(r)),
  removeListener: (e, o) => n.removeListener(e, o),
  maximize: () => n.invoke("maximize-window"),
  minimize: () => n.invoke("minimize-window"),
  close: () => n.invoke("close-window")
});
c.exposeInMainWorld("updater", {
  onStatus: (e) => n.on("update-status", (o, r) => e(r)),
  onProgress: (e) => n.on("update-progress", (o, r) => e(r)),
  onReady: (e) => n.on("update-ready", () => e()),
  onError: (e) => n.on("update-error", (o, r) => e(r)),
  checkForUpdates: () => n.invoke("check-for-updates"),
  restartAndInstall: () => n.invoke("restart-and-install")
});
