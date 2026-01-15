import { app, ipcMain } from 'electron'
import PouchDB from 'pouchdb'
import path from 'node:path'
import fs from 'node:fs'
import { Customer, NewCustomer } from '../shared/types/ipc'
import { randomUUID } from 'node:crypto'
import { PouchDBResponse } from '../shared/types/db'

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

async function addCustomer(doc: NewCustomer): PouchDBResponse {
  const id = randomUUID()

  const data: Customer = {
    ...doc,
    _id: id,
    createdAt: new Date()
  }
  return db
    .put(data)
    .then((response) => response)
    .catch((err) => console.error('Erro ao cadastrar', err))
}

ipcMain.handle('add-customer', async (event, doc: Customer) => {
  const result = await addCustomer(doc)
  return result
})

async function getAllCustomers(): Promise<Customer[]> {
  try {
    const result = await db.allDocs({ include_docs: true })
    return result.rows
      .map((row) => row.doc as Customer)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.log('Erro ao pegar clientes ', error)
    return []
  }
}

ipcMain.handle('get-all-customers', async () => {
  return await getAllCustomers()
})

async function getCustomerById(docId: string) {
  return db
    .get(docId)
    .then((doc) => doc)
    .catch((err) => {
      console.error('Erro ao pegar cliente por ID ', err)
      return null
    })
}

ipcMain.handle('get-customer-by-id', async (event, docId: string) => {
  const result = await getCustomerById(docId)
  return result
})

async function deleteCustomerById(docId: string): PouchDBResponse {
  try {
    const doc = await db.get(docId)
    const result = await db.remove(doc._id, doc._rev)
    return result
  } catch (error) {
    console.error('Erro ao deletar cliente ', error)
    return null
  }
}

ipcMain.handle('delete-customer-by-id', async (event, docId: string): PouchDBResponse => {
  return await deleteCustomerById(docId)
})
