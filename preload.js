const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("API", {
  onQr: (callback) => ipcRenderer.on("qr-code", (_event, qr) => callback(qr)),
  onClientReady: (callback) =>
    ipcRenderer.on("client-ready", (_event, userName, contacts) =>
      callback(userName, contacts)
    ),
  onClientDisconenct: (callback) =>
    ipcRenderer.on("user-disconnect", (_event) => callback()),
  sendTestMessage: (msg) => ipcRenderer.send("test-message", msg),
  sendMessage: (msg, ids) => ipcRenderer.send("send-message", msg, ids),
});
