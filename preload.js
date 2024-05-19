const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  handleQr: (callback) =>
    ipcRenderer.on("qr-code", (_event, qr) => callback(qr)),
  onClientReady: (callback) =>
    ipcRenderer.on("client-ready", (_event) => callback()),
});
