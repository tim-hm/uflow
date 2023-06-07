import { contextBridge, ipcRenderer } from "electron"
import type { SearchResult } from "./search"

declare global {
  interface Window {
    electron: {
      receiveTheme: (func: (theme: string) => void) => void
      invokeSearchResult: (result: SearchResult) => void
    }
  }
}

contextBridge.exposeInMainWorld("electron", {
  receiveTheme: (func: any) =>
    ipcRenderer.on("theme", (event, ...args) => func(...args)),

  invokeSearchResult: (result: SearchResult) => {
    ipcRenderer.send("invokeSearchResult", result)
  },
})
