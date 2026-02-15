import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { spawn } from 'node:child_process'
import iconv from 'iconv-lite'
import { autoUpdater } from 'electron-updater'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC!, 'a_logo_2_S.jpg'),
    title: "Navigator Studio",
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
    frame: false,
    autoHideMenuBar: false, // ← hides the menu/toolbar
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
ipcMain.handle("minimize-window", () => {
  win?.minimize();
});

ipcMain.handle("maximize-window", () => {
  if (win?.isMaximized()) win.unmaximize();
  else win?.maximize();
});

ipcMain.handle("close-window", () => {
  win?.close();
});

ipcMain.handle("run-executable", (event, exeName: string) => {
  return new Promise((resolve, reject) => {
    const exePath = path.join(process.env.APP_ROOT!, exeName);
    const child = spawn(exePath, [], {
      windowsHide: true,
      cwd: path.dirname(exePath),
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data: Buffer) => {
      const text = iconv.decode(data, "win1250"); // decode using correct encoding
      stdout += text;
      event.sender.send("exe-stdout", text);
    });

    child.stderr.on("data", (data: Buffer) => {
      const text = iconv.decode(data, "win1250");
      stderr += text;
      event.sender.send("exe-stderr", text);
    });

    child.on("close", (code) => {
      if (code === 0) resolve(stdout || "Executed successfully");
      else reject(stderr || `Process exited with code ${code}`);
    });

    child.on("error", (err) => reject(err.message));
  });
});

ipcMain.handle("open-folder", async (event, folderPath: string) => {
  const { shell } = await import('electron');
  await shell.openPath(folderPath);
});

autoUpdater.on("checking-for-update", () => {
  win?.webContents.send("update-status", "Checking for updates...");
});

autoUpdater.on("update-available", () => {
  win?.webContents.send("update-status", "Downloading update...");
});

autoUpdater.on("download-progress", (progress) => {
  win?.webContents.send("update-progress", progress.percent);
});

autoUpdater.on("update-downloaded", () => {
  win?.webContents.send("update-ready");
});

autoUpdater.on("error", (err) => {
  win?.webContents.send("update-error", err.message);
});

app.whenReady().then(() => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
})

