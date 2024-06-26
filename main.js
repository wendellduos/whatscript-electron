const { app, BrowserWindow, Menu } = require("electron");
const { Client, MessageMedia } = require("whatsapp-web.js");
const path = require("node:path");
const { ipcMain } = require("electron");

let client;
let contactList = [];
let user = {};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 764,
    minHeight: 515,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Menu.setApplicationMenu(null);

  ipcMain.on("login", () => {
    initClient();
  });

  ipcMain.on("logout", () => {
    client.destroy();

    client = {};
    contactList = [];
    user = {};
  });

  // minimize, maxmize, close app's window
  ipcMain.on("minimize", () => {
    const window = BrowserWindow.getFocusedWindow();
    window.minimize();
  });

  ipcMain.on("close", () => {
    const window = BrowserWindow.getFocusedWindow();
    window.close();
  });

  ipcMain.on("test-message", async (event, msg) => {
    client.sendMessage(user.id, msg);
  });

  ipcMain.on("test-media-message", async (event, msg, data, base64) => {
    try {
      const image = new MessageMedia(data, base64);
      await client.sendMessage(user.id, image, {
        caption: msg,
      });
    } catch (error) {
      console.log(error);
    }
  });

  ipcMain.on("send-message", async (event, msg, ids) => {
    ids.forEach((id) => {
      client.sendMessage(id, msg);
    });
  });

  ipcMain.on("send-media-message", async (event, msg, ids, data, base64) => {
    try {
      const image = new MessageMedia(data, base64);

      await ids.forEach((id) => {
        client.sendMessage(id, image, {
          caption: msg,
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

  mainWindow.loadFile(path.join(__dirname, "client/index.html"));

  function initClient() {
    client = new Client({
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

      contactList = [];

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

    client.on("disconnected", () => {
      mainWindow.webContents.send("user-disconnect");

      client.destroy();

      client = {};
      contactList = [];
      user = {};

      initClient();
    });

    client.initialize();
  }
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
