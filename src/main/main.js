const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const remoteMain = require('@electron/remote/main');

remoteMain.initialize();

let win; // Hacemos win accesible fuera de createWindow

function createWindow() {
  win = new BrowserWindow({
    width: 1100,
    height: 550,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      contextIsolation: true, // IMPORTANTE: true para usar contextBridge
      nodeIntegration: false, // IMPORTANTE: false por seguridad
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true, // Solo si usas remote
    },
  });
  require('@electron/remote/main').enable(win.webContents);
  remoteMain.enable(win.webContents);

  win.loadFile('public/index.html');
}

// Listeners para los controles de ventana
ipcMain.on('minimize-window', () => {
  if (win) win.minimize();
});
ipcMain.on('maximize-window', () => {
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
});
ipcMain.on('close-window', () => {
  if (win) win.close();
});

app.whenReady().then(createWindow);
