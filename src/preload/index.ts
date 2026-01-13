import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: API
  }
}

interface API {
  onNewClient: (callback: VoidFunction) => VoidFunction
  fetchUsers: () => Promise<void>
}

// Custom APIs for renderer
const api: API = {
  onNewClient: (callback: () => void) => {
    ipcRenderer.on('new-client', callback)

    return () => {
      ipcRenderer.off('new-client', callback)
    }
  },

  fetchUsers: () => {
    // INVOKE -> enviar e receber
    return ipcRenderer.invoke('fetch-users')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
