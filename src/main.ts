import {app, BrowserWindow, globalShortcut} from 'electron';
import * as path from 'path';
import config from './config';

let mainWindow: Electron.BrowserWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  })
  //se quiser usar como um navegador que sempre vai ficar no topo da tela
  mainWindow.loadURL(config.url);

  // mainWindow.loadFile(path.join(__dirname, "../FrontEnd/index.html") )

  mainWindow.on("closed", ()=>{
    mainWindow = null;
  });
}


function toggleDevTools(){
  mainWindow.webContents.toggleDevTools()
}

function createShortcuts(){
  globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
}

app.whenReady()
.then(createWindow)
.then(createShortcuts)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
