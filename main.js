const { BrowserWindow, app } = require("electron");

const path = require("node:path");
const root = __dirname;
const icon = path.resolve(root, "resources", "icon.png");

const { registerIpcHandlers } = require("./ipcHandlers");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 400,
    minHeight: 300,
    fullscreenable: true,
    kiosk: true,
    show: false,
    icon,
    webPreferences: {
      preload: path.resolve(root, "preload.js"),
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
  win.setFullScreen(true);

}

app.whenReady().then(() => {
  createWindow();
  registerIpcHandlers(win);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      registerIpcHandlers(win);
    }
  });
});
