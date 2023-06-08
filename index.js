const {app, BrowserWindow, Menu, MenuItem} = require('electron')


let win = null

const createWindow = () => {
    win = new BrowserWindow({
        width: 1920,
        height: 1080
    })

    win.loadURL('http://localhost:3000/')
}

const dockMenu = Menu.buildFromTemplate([
    {
        label: 'Log out',
        click() {
            // go to login page
            win.loadURL('http://localhost:3000/auth/logout')
        }
    }
])

function createAboutWindow() {
    const aboutWindow = new BrowserWindow({
        width: 450,
        height: 450,
        resizable: false,
        title: 'About',
        // Set parent window to the current focused window
        parent: BrowserWindow.getFocusedWindow()
    });

    // Load the HTML file for the about window
    aboutWindow.loadFile('./about.html');
}

const menu = new Menu()
menu.append(new MenuItem({
    label: 'SiLVoam Hospital',
    submenu: [
        {
            label: 'About',
            click: () => {
                createAboutWindow()
            }
        },
        {
            label: 'Reload',
            role: 'Reload',
            accelerator: process.platform === 'darwin' ? 'Cmd+R' : 'Ctrl+R',
            click: () => {
                // Refresh web contents
                BrowserWindow.getFocusedWindow().webContents.reload()
            }
        },
        {
            label: 'Quit SiLVoam Hospital',
            role: 'Quit',
            accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
            click: () => {
                app.quit()
            }
        },
        {
            label: 'Log out',
            accelerator: process.platform === 'darwin' ? 'Cmd+L' : 'Ctrl+L',
            click() {
                // go to login page
                win.loadURL('http://localhost:3000/auth/logout')
            }
        }
    ]
}))
Menu.setApplicationMenu(menu)

app.whenReady().then(() => {
    // dock menu
    if (process.platform === 'darwin') {
        app.dock.setMenu(dockMenu)
    }
}).then(createWindow)
