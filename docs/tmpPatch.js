const electron = {
  isFullscreen: () => {
    return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  },
  enterFullscreen: (element = document.documentElement) => {
    if (document.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
    }
  },
  exitFullscreen: () => {
    if (electron.isFullscreen() && document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  },
  ipcRenderer: {
    send: function (channel, ...data) {
      switch (channel) {
        case "e_isFullScreen":
          return electron.isFullscreen();
        case "e_fullScreen":
          return electron.isFullscreen() ? electron.exitFullscreen() : electron.enterFullscreen();
        case "e_window":
          return electron.exitFullscreen();
        case "e_openURL":
          return electron.shell.openExternal(data[0]);
      }
    },
    sendSync: function (channel, data) {
      switch (channel) {
        case "e_isFullScreen":
          return electron.isFullscreen();
      }
    },
    on: function (channel, callback) {
    }
  },
  shell: {
    openExternal: function (url) {
      return window.open(url, '_blank');
    }
  }
};

if (!window.electron) {
  window.electron = electron;
}