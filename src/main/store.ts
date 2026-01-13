import { app, ipcMain } from 'electron'
import PouchDB from 'pouchdb'
import path from 'node:path'
import fs from 'node:fs'
import { Customer, NewCustomer } from '../shared/types/ipc'

// Determinar o caminho base para o banco de dados com base no sistema operacional
let dbPath

if (process.platform === 'darwin') {
  // Caminho para MacOS
  dbPath = path.join(app.getPath('appData'), 'devclients', 'my_db')
} else {
  dbPath = path.join(app.getPath('appData'), 'my_db')
}

// Verificar e criar o diretório se não existir
const dbDir = path.dirname(dbPath)

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

// Inicialializar o DB
const db = new PouchDB<Customer>(dbPath)
