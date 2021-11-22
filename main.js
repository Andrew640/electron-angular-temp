const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
const si = require("systeminformation");

let win;
var args = process.argv.slice(1), serve = args.some(function (val) { return val === '--serve'; });

function createWindow() {
    win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            allowRunningInsecureContent: (serve) ? true : false,
        },
    });

    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(path.join(__dirname, './node_modules/electron'))
        });
        win.loadURL('http://localhost:4200');
    }
    else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, "/dist/index.html"),
                protocol: "file:",
                slashes: true,
            })
        );
    }

    win.on("closed", () => {
        win = null;
    });
}

app.on("ready", createWindow);

app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

function sendTemp() {
    si.cpuTemperature()
        .then((data) => {
            if (data && data.main) {
                win.webContents.send("getTemp", data.main);
            }
        })
        .catch((error) => console.error(error));
}

ipcMain.on("getTemp", (event, path) => {
    sendTemp();
});
