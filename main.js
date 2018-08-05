const {app, BrowserWindow, dialog} = require('electron')
const git = require('simple-git')

let mainWindow

//functions
function createWindow () {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    mainWindow.loadFile("index.html");

    mainWindow.on("closed", function() {
        mainWindow = null;
    });
};

function selectDirectory() {
    return dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"]
    })
};

function cloneRepo(folder_path, git_url) {
    git.clone(git_url, folder_path);
};

function updateRepo(folder_path) {
    git(folder_path).pull();
};

//events
app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    };
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    };
});

//exports

module.exports = {
    selectDirectory,
    cloneRepo,
    updateRepo
}


