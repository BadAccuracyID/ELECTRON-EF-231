const {globalShortcut} = require('electron')
const {app, BrowserWindow, Menu} = require('electron')


const createWindow = () => {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080
    })

    win.loadURL('http://localhost:3000/')
}


const dockMenu = Menu.buildFromTemplate([
    {
        label: 'New Window',
        click() {
            console.log('New Window')
        }
    }, {
        label: 'New Window with Settings',
        submenu: [
            {label: 'Basic'},
            {label: 'Pro'}
        ]
    },
    {label: 'New Command...'}
])

app.whenReady().then(() => {
    // quit shortcut
    globalShortcut.register('CommandOrControl+W', () => {
        app.quit();
    });

    // dock menu
    if (process.platform === 'darwin') {
        app.dock.setMenu(dockMenu)
    }
}).then(createWindow)
