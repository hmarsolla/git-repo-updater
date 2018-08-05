// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron')
const remote = electron.remote
const mainProcess = remote.require('./main')

//events
document.getElementById('directory').addEventListener("click", () => {
    let path = mainProcess.selectDirectory()
    document.getElementById("local-path").value = path;
});

document.getElementById("clone-rd").addEventListener("change", () => {
    render_content("clone");
});

document.getElementById("update-rd").addEventListener("change", () => {
    render_content("update");
});

document.getElementById("clone").addEventListener("click", () => {
    let folder_path = document.getElementById("local-path").value;
    let git_url = document.getElementById("git_url").value;
    mainProcess.cloneRepo(folder_path, git_url);
});

document.getElementById("update").addEventListener("click", () => {
    let folder_path = document.getElementById("local-path").value;
    mainProcess.updateRepo(folder_path);
});

//functions

function render_content (content) {
    if (content === "clone") {
        document.getElementById("clone-container").hidden = false;
        document.getElementById("update-container").hidden = true;
    }else if (content === "update"){
        document.getElementById("update-container").hidden = false;
        document.getElementById("clone-container").hidden = true;
    };
};
