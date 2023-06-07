import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  nativeTheme,
} from "electron"
import { exec } from "node:child_process"
import type { SearchResult } from "../frontend/search"

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

if (require("electron-squirrel-startup")) {
  app.quit()
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    transparent: true,
    frame: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
    },
  })

  globalShortcut.register("Control+Shift+H", () => {
    if (mainWindow.isFocused()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })

  if (nativeTheme.shouldUseDarkColors) {
    sendDark()
  } else {
    sendLight()
  }

  nativeTheme.on("updated", () => {
    if (nativeTheme.shouldUseDarkColors) {
      sendDark()
    } else {
      sendLight()
    }
  })

  function sendDark() {
    mainWindow.webContents.send("theme", "dark")
  }

  function sendLight() {
    mainWindow.webContents.send("theme", "light")
  }

  ipcMain.on("invokeSearchResult", (event, message: SearchResult) => {
    console.log(message)
    exec(
      "/home/tim/.cargo/bin/desktopctl theme toggle",
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error}`)
          return
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`)
          return
        }
        console.log(`stdout: ${stdout}`)
      }
    )
  })

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.on("ready", createWindow)

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
