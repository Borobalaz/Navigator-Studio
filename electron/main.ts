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
    win.loadFile(path.join(__dirname, "../dist/index.html"));
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

ipcMain.handle("run-executable", (event, exeRelativePath: string, args: string[] = []) => {
  return new Promise((resolve, reject) => {
    // dev vs packaged path
    const basePath = app.isPackaged
      ? path.join(process.resourcesPath, "public")
      : path.join(__dirname, "../public");

    const exePath = path.join(basePath, exeRelativePath);

    console.log("Running exe:", exePath, "with args:", args);

    const child = spawn(exePath, args, {
      windowsHide: true,
      cwd: path.dirname(exePath),
    });

    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (data: Buffer) => {
      const text = iconv.decode(data, "win1250");
      stdout += text;
      event.sender.send("exe-stdout", text);
    });

    child.stderr?.on("data", (data: Buffer) => {
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

ipcMain.handle("open-folder", async (_event, folderPath: string) => {
  const { shell } = await import('electron');
  await shell.openPath(folderPath);
});

ipcMain.handle("get-public-path", (_, ...segments: string[]) => {
  const basePath = app.isPackaged
    ? path.join(process.resourcesPath, "public")
    : path.join(process.cwd(), "public");

  return path.join(basePath, ...segments);
});

// Auto-updater configuration
autoUpdater.autoDownload = false; // Don't auto-download, let user control
autoUpdater.autoInstallOnAppQuit = true; // Install on app quit

autoUpdater.on("checking-for-update", () => {
  win?.webContents.send("update-status", "Checking for updates...");
  console.log("Checking for updates...");
});

autoUpdater.on("update-available", () => {
  win?.webContents.send("update-status", "Update available. Starting download...");
  console.log("Update available, starting download...");
  // Auto-start download once update is available
  autoUpdater.downloadUpdate();
});

autoUpdater.on("update-not-available", () => {
  win?.webContents.send("update-status", "");
  console.log("Already up to date.");
});

autoUpdater.on("download-progress", (progress) => {
  win?.webContents.send("update-progress", Math.round(progress.percent));
  console.log(`Download progress: ${Math.round(progress.percent)}%`);
});

autoUpdater.on("update-downloaded", () => {
  win?.webContents.send("update-status", "Update ready. Restart to install.");
  win?.webContents.send("update-ready");
  console.log("Update downloaded and ready to install.");
});

autoUpdater.on("error", (err) => {
  win?.webContents.send("update-status", "");
  win?.webContents.send("update-error", err.message);
  console.error("Update error:", err.message);
});

// IPC handlers for update control
ipcMain.handle("check-for-updates", async () => {
  try {
    const result = await autoUpdater.checkForUpdates();
    return { found: !!result?.updateInfo };
  } catch (err) {
    console.error("Error checking for updates:", err);
    throw err;
  }
});

ipcMain.handle("restart-and-install", () => {
  autoUpdater.quitAndInstall();
});

app.whenReady().then(() => {
  createWindow();
  
  // Check for updates on app start
  autoUpdater.checkForUpdates();
  
  // Check for updates every 10 minutes
  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 10 * 60 * 1000);
});

