const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  const { screen } = require('electron');
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workArea;

  mainWindow = new BrowserWindow({
    width: width, // Full width of screen
    height: 60,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: true,
    hasShadow: false, // Remove shadow to look cleaner
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the HTML file
  mainWindow.loadFile('index.html');

  // CRITICAL: Allow window to show on top of Fullscreen apps (macOS)
  mainWindow.setAlwaysOnTop(true, 'screen-saver', 1);
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  // Position window flush at the bottom (use workArea to avoidDock/Taskbar)
  mainWindow.setPosition(
    primaryDisplay.workArea.x,
    primaryDisplay.workArea.y + height - 60
  );

  // DevTools disabled for production (uncomment below to enable for debugging)
  // mainWindow.webContents.openDevTools({ mode: 'detach' });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // IPC listeners
  ipcMain.on('window-minimize', () => {
    if (mainWindow) mainWindow.minimize();
  });

  ipcMain.on('window-close', () => {
    if (mainWindow) mainWindow.close();
  });

  ipcMain.on('window-set-layout', (event, mode) => {
    if (mainWindow) {
      const { screen } = require('electron');
      const currentDisplay = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
      const { width, height } = currentDisplay.workArea; // Using workArea to respect taskbars/docks

      if (mode === 'sidebar') {
        const sidebarWidth = 280;
        mainWindow.setSize(sidebarWidth, height);
        mainWindow.setPosition(
          currentDisplay.workArea.x + width - sidebarWidth,
          currentDisplay.workArea.y
        );
      } else {
        // Default: Bottom Bar
        mainWindow.setSize(width, 60);
        mainWindow.setPosition(
          currentDisplay.workArea.x,
          currentDisplay.workArea.y + height - 60
        );
      }
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


