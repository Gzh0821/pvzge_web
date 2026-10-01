const { ipcMain, shell, screen, app } = require("electron");

function registerIpcHandlers(win) {
  ipcMain.on("e_center", () => {
    win?.center();
  });

  ipcMain.on("e_fullScreen", () => {
    if (win) win.setFullScreen(!win.isFullScreen());
  });

  ipcMain.on("e_window", () => {
    win?.setFullScreen(false);
  });

  ipcMain.on("e_openURL", (_, url) => {
    if (url) shell.openExternal(url);
  });

  ipcMain.on("e_openDevTools", () => {
    win?.webContents.openDevTools({ mode: "detach" });
  });

  ipcMain.on("e_closeDevTools", () => {
    win?.webContents.closeDevTools();
  });

  ipcMain.on("e_setSize", (_, width, height) => {
    const w = Number(width);
    const h = Number(height);
    if (win && !Number.isNaN(w) && !Number.isNaN(h) && !win.isFullScreen()) {
      win.setSize(w, h);
    }
  });

  ipcMain.on("e_setResolution", (_, width, height) => {
    const w = Number(width);
    const h = Number(height);
    if (win && !Number.isNaN(w) && !Number.isNaN(h)) {
      if (win.isFullScreen()) {
        win.setContentSize(w, h);
      } else {
        win.setSize(w, h);
      }
    }
  });

  ipcMain.on("e_nircmdUD", (_, arg) => {
    console.debug("e_nircmdUD called with", arg);
  });

  ipcMain.on("e_quit", () => {
    app.quit();
  });

  ipcMain.on("e_isFullScreen", (event) => {
    event.returnValue = win ? win.isFullScreen() : false;
  });

  ipcMain.on("e_getMassage", (event) => {
    event.returnValue = `Electron ${app.name || "app"} on ${process.platform}`;
  });

  ipcMain.on("e_getAllResolutions", (event) => {
    event.returnValue = screen
      .getAllDisplays()
      .map((d) => `${d.size.width}×${d.size.height}`);
  });

  ipcMain.on("e_getCurrentResolution", (event) => {
    if (!win) {
      event.returnValue = "1920×1080";
      return;
    }

    const [width, height] = win.getSize();
    event.returnValue = `${width}×${height}`;
  });
}

module.exports = { registerIpcHandlers };
