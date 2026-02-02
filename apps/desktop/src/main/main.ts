import { app, BrowserWindow } from 'electron';
import path from 'path';

/**
 * Main application window reference.
 */
let mainWindow: BrowserWindow | null;

/**
 * Creates and configures the main Electron window.
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = app.isPackaged
    ? `file://${path.join(__dirname, '../renderer/index.html')}`
    : 'http://localhost:5173';

  mainWindow.loadURL(startUrl);

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
