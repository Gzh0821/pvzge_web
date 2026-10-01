const { contextBridge, ipcRenderer } = require('electron');

const sendChannels = new Set([
  'e_center',
  'e_fullScreen',
  'e_window',
  'e_openURL',
  'e_openDevTools',
  'e_closeDevTools',
  'e_setSize',
  'e_setResolution',
  'e_nircmdUD',
  'e_quit',
]);

const syncChannels = new Set([
  'e_isFullScreen',
  'e_getMassage',
  'e_getAllResolutions',
  'e_getCurrentResolution',
]);

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send(channel, ...args) {
      if (sendChannels.has(channel)) {
        ipcRenderer.send(channel, ...args);
      }
    },
    sendSync(channel, ...args) {
      if (syncChannels.has(channel)) {
        return ipcRenderer.sendSync(channel, ...args);
      }
      return undefined;
    },
    on(channel, listener) {
      // Expose only if supported by the preload API.
      ipcRenderer.on(channel, listener);
    },
  },
});
