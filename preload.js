const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("API", {
  onQr: (callback) => ipcRenderer.on("qr-code", (_event, qr) => callback(qr)),
  onClientReady: (callback) =>
    ipcRenderer.on("client-ready", (_event, userName, contacts) =>
      callback(userName, contacts)
    ),
  onClientDisconenct: (callback) =>
    ipcRenderer.on("user-disconnect", (_event) => callback()),

  minimizeWindow: () => ipcRenderer.send("minimize"),
  closeWindow: () => ipcRenderer.send("close"),
  sendTestMessage: (msg) => ipcRenderer.send("test-message", msg),
  sendTestMediaMessage: (msg, data, base64) =>
    ipcRenderer.send("test-media-message", msg, data, base64),
  sendMessage: (msg, ids) => ipcRenderer.send("send-message", msg, ids),
  sendMediaMessage: (msg, ids, data, base64) =>
    ipcRenderer.send("send-media-message", msg, ids, data, base64),
});
