import { ipcMain } from 'electron'

ipcMain.handle('fetch-users', () => {
  console.log('BUSCANDO USUÁRIOS...')

  return [
    { id: 1, nome: 'Matheus' },
    { id: 2, nome: 'Lucas' },
    { id: 3, nome: 'Ana' }
  ]
})
