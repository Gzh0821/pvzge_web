const { BrowserWindow, app } = require("electron");

const path = require("node:path");
const root = __dirname;
const icon = path.resolve(root, "resources", "icon.png");

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 400,
    minHeight: 300,
    fullscreen: true,
    icon,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      experimentalFeatures: false,
      webviewTag: false,
      devTools: false,
    },
  });

  win.loadFile(path.resolve(root, "docs", "index.html"));
}

app.whenReady().then(createWindow);
