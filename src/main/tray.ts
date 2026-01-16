import { Menu, Tray, nativeImage, BrowserWindow } from 'electron'
import path from 'node:path'

export function createTray(window: BrowserWindow): Tray {
  const iconPath = path.resolve(__dirname, 'resources', 'iconSmall.png')
  let icon = nativeImage.createFromPath(iconPath)
  const tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    {
      icon: path.resolve(__dirname, 'resources', 'iconSmall.png'),
      label: 'Mostrar Aplicativo',
      click: () => {
        window.show()
      }
    },
    { type: 'separator' },
    {
      label: 'Cadastrar cliente',
      click: () => {
        //Enviar mensagem do processo (main) para o processo frontend (renderer)
        window.show()
        window.webContents.send('new-client')
      }
    },
    { type: 'separator' },
    {
      label: 'Sair',
      role: 'quit',
      click: () => {
        window.destroy()
      }
    }
  ])
  tray.setToolTip('Dev Clients App')
  tray.setContextMenu(contextMenu)
  return tray
}
