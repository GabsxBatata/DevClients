import { BrowserWindow, app, globalShortcut } from 'electron'

export function createShortcuts(window: BrowserWindow) {
  app.on('browser-window-focus', (event) => {
    globalShortcut.register('CommandOrControl+N', () => window.webContents.send('new-client'))
  })

  app.on('browser-window-blur', () => globalShortcut.unregisterAll())
}
