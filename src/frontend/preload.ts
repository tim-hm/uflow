import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("electron", {
  receiveTheme: (func: any) =>
    ipcRenderer.on("theme", (event, ...args) => func(...args)),
})
