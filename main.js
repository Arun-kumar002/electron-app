const { app, BrowserWindow } = require("electron");
const path = require("path");
const isMac = process.platform !== 'darwin';
const isDev = process.env.ENV != "production";
//we can able to create many window.
function createMainWindow() {
    const mainWindow = new BrowserWindow(
        {
            title: "Image Resize",
            width: isDev ? 1000 : 500,
            height: 600
        }
    )
    if (isDev) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"))
}


app.whenReady().then(() => {
    createMainWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
}).catch((err) => {
    console.log("[app]Err:", err)
})

app.on('window-all-closed', () => {
    if (isMac) { app.quit() }
})