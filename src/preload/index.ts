import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { Customer, NewCustomer } from '../shared/types/ipc'
import { PouchDBResponse } from '../shared/types/db'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: API
  }
}

interface API {
  onNewClient: (callback: VoidFunction) => VoidFunction
  fetchUsers: () => Promise<void>
  addCustomer: (doc: NewCustomer) => PouchDBResponse
  getAllCustomers: () => Promise<Customer[]>
  getCustomerById: (docId: string) => Promise<Customer>
  deleteCustomerById: (docId: string) => PouchDBResponse
}

// Custom APIs for renderer
const api: API = {
  onNewClient(callback) {
    ipcRenderer.on('new-client', callback)

    return () => {
      ipcRenderer.off('new-client', callback)
    }
  },

  fetchUsers() {
    return ipcRenderer.invoke('fetch-users')
  },

  addCustomer(doc) {
    return ipcRenderer.invoke('add-customer', doc)
  },

  getAllCustomers() {
    return ipcRenderer.invoke('get-all-customers')
  },

  getCustomerById(docId) {
    return ipcRenderer.invoke('get-customer-by-id', docId)
  },

  deleteCustomerById(docId) {
    return ipcRenderer.invoke('delete-customer-by-id', docId)
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
