import {
  app,
  BrowserWindow,
  ipcMain,
  shell,
  type IpcMainInvokeEvent,
} from 'electron';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import started from 'electron-squirrel-startup';

if (started) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;
let splashHasPresented = false;
let splashMinimumTimeElapsed = false;
let mainRendererIsReady = false;
const splashMinimumDurationMs = 5000;

function createSplashWindow() {
  splashHasPresented = false;
  splashMinimumTimeElapsed = false;
  const window = new BrowserWindow({
    width: 750,
    height: 500,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    show: false,
    hasShadow: true,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  splashWindow = window;
  window.on('closed', () => {
    if (splashWindow === window) {
      splashWindow = null;
      revealMainWindow();
    }
  });

  void loadWindow(window, true);

  window.once('ready-to-show', () => {
    if (window.isDestroyed() || splashWindow !== window) return;
    window.show();
    splashHasPresented = true;
    setTimeout(() => {
      splashMinimumTimeElapsed = true;
      revealMainWindow();
    }, splashMinimumDurationMs);
  });
}

function createMainWindow() {
  mainRendererIsReady = false;
  const window = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 760,
    minHeight: 540,
    title: 'GM Studio',
    backgroundColor: '#242424',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow = window;
  window.on('closed', () => {
    if (mainWindow === window) mainWindow = null;
  });

  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));

  window.webContents.on('will-navigate', (event, url) => {
    const devServerUrl = MAIN_WINDOW_VITE_DEV_SERVER_URL;

    const isAppNavigation = devServerUrl
      ? new URL(url).origin === new URL(devServerUrl).origin
      : url ===
        pathToFileURL(
          path.resolve(
            __dirname,
            `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`,
          ),
        ).href;

    if (!isAppNavigation) {
      event.preventDefault();
    }
  });

  void loadWindow(window, false);
}

async function loadWindow(window: BrowserWindow, isSplash: boolean) {
  try {
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      const url = new URL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
      if (isSplash) url.searchParams.set('screen', 'splash');
      await window.loadURL(url.href);
    } else {
      await window.loadFile(
        path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
        isSplash ? { query: { screen: 'splash' } } : undefined,
      );
    }
  } catch (error) {
    console.error(
      `Failed to load ${isSplash ? 'splash' : 'main'} window:`,
      error,
    );

    if (isSplash) {
      if (!window.isDestroyed()) window.close();
      if (splashWindow === window) splashWindow = null;
      revealMainWindow();
      return;
    }

    if (!window.isDestroyed()) window.close();
    if (mainWindow === window) mainWindow = null;
    if (splashWindow && !splashWindow.isDestroyed()) splashWindow.close();
    app.quit();
  }
}

function showMainWindow(sender: Electron.WebContents) {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  if (BrowserWindow.fromWebContents(sender) !== mainWindow) return;

  mainRendererIsReady = true;
  revealMainWindow();
}

function revealMainWindow() {
  if (!mainRendererIsReady || !mainWindow || mainWindow.isDestroyed()) return;
  if (splashHasPresented && !splashMinimumTimeElapsed) return;
  if (splashWindow && !splashWindow.isDestroyed() && !splashHasPresented)
    return;

  mainWindow.show();
  if (splashWindow && !splashWindow.isDestroyed()) splashWindow.close();
  splashWindow = null;
}

function registerIpcHandlers() {
  ipcMain.handle('app:open-project-repository', async (event) => {
    assertTrustedSender(event);
    await shell.openExternal('https://github.com/Dufru/gm-studio');
  });
}

function assertTrustedSender(event: IpcMainInvokeEvent) {
  const senderWindow = BrowserWindow.fromWebContents(event.sender);

  if (!senderWindow || event.senderFrame !== event.sender.mainFrame) {
    throw new Error('Origem da solicitação não permitida.');
  }
}

app.whenReady().then(() => {
  registerIpcHandlers();
  ipcMain.on('app:main-window-ready', (event) => showMainWindow(event.sender));

  createSplashWindow();
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createSplashWindow();
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
