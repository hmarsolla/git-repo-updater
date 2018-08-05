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

async function cloneRepo(folder_path, git_url) {
    try{
        await git().cwd(folder_path).clone(git_url);
        dialog.showMessageBox(mainWindow, {message: "Git Repository Cloned Successfully"})
    }catch(e){
        dialog.showErrorBox("Error", e.toString())
    };
};

async function updateRepo(folder_path) {
    try{
        await git(folder_path).pull();
        dialog.showMessageBox(mainWindow, {message: "Git Repository Updated Successfully"})
    }catch(e){
        dialog.showErrorBox("Error", e.toString())
    };
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


