const { app, BrowserWindow } = require("electron/main");
const { Client } = require("whatsapp-web.js");
const path = require("node:path");
const { ipcMain } = require("electron");

let contactList = [];
let user = {};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
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
    mainWindow.webContents.send("qr-code", qr);
  });

  client.on("ready", async () => {
    const allContacts = await client.getContacts();

    // get user's own id/number
    allContacts.forEach((contact) => {
      if (
        contact.isUser &&
        contact.isWAContact &&
        contact.isMyContact &&
        !contact.isGroup &&
        !contact.isBlocked
      ) {
        contactList.push({
          name: contact.name,
          number: contact.number,
          id: contact.id._serialized,
        });
      }

      if (contact.isMe) {
        user.id = contact.id._serialized;
        user.name = contact.pushname;
      }
    });

    mainWindow.webContents.send("client-ready", user.name, contactList);
  });

  ipcMain.on("test-message", async (event, msg) => {
    client.sendMessage(user.id, msg);
  });

  ipcMain.on("send-message", async (event, msg, ids) => {
    ids.forEach((id) => {
      client.sendMessage(id, msg);
    });
  });

  client.on("disconnected", () => {
    mainWindow.webContents.send("user-disconnect");

    client.destroy();
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
