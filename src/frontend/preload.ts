// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("electron", {
  receiveTheme: (func: any) =>
    ipcRenderer.on("theme", (event, ...args) => func(...args)),
})

// ipcRenderer.on("theme", (event, theme) => {
//   if (theme === "dark") {
//     document.body.style.background = "black"
//   } else {
//     document.body.style.background = "white"
//   }
// })
