const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
const si = require("systeminformation");

let win;
var args = process.argv.slice(1), serve = args.some(function (val) { return val === '--serve'; });

const electron = require('electron')

function createWindow() {
    win = new BrowserWindow({
        width: 746,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            allowRunningInsecureContent: (serve) ? true : false,
        },
    });

    if (serve) {
        win.webContents.openDevTools();
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

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

function sendTemp() {
    si.cpuTemperature()
        .then((data) => {
            if (data && data.main) {
                win.webContents.send("getTemp", data.main);
                console.log(data.main);
            }
        })
        .catch((error) => console.error(error));
}

// function isRoot() {
//     return path.parse(process.cwd()).root == process.cwd();
// }

// function getDirectory() {
//     fs.readdir(".", { withFileTypes: true }, (err, files) => {
//         if (!err) {
//             const directories = files
//                 .filter((file) => file.isDirectory())
//                 .map((file) => file.name);
//             if (!isRoot()) {
//                 directories.unshift("..");
//             }
//             win.webContents.send("getDirectoryResponse", directories);
//         }
//     });
// }

ipcMain.on("getTemp", (event, path) => {
    sendTemp();
});
