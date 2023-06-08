const {globalShortcut} = require('electron')
const {app, BrowserWindow} = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadURL('http://localhost:3000/')
}

app.whenReady().then(() => {
    // quit shortcut
    globalShortcut.register('CommandOrControl+W', () => {
        app.quit();
    });
}).then(createWindow)
