const { app, BrowserWindow } = require("electron/main");
const { Client, MessageMedia } = require("whatsapp-web.js");
const path = require("node:path");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 1264,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const client = new Client({
    webVersionCache: {
      type: "remote",
      remotePath:
        "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    },
  });

  client.on("qr", (qr) => {
    console.log(qr);
    mainWindow.webContents.send("qr-code", qr);
  });

  client.on("ready", () => {
    console.log("Client is ready!");
    mainWindow.webContents.send("client-ready");
  });

  client.initialize();

  mainWindow.loadFile(path.join(__dirname, "client/index.html"));
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
