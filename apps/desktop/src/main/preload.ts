import { contextBridge, ipcRenderer } from 'electron';

/**
 * Exposes a minimal IPC API to the renderer process.
 */
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    invoke: (channel: string, ...args: any[]) =>
      ipcRenderer.invoke(channel, ...args),
    on: (channel: string, listener: any) =>
      ipcRenderer.on(channel, listener),
    send: (channel: string, ...args: any[]) =>
      ipcRenderer.send(channel, ...args),
  },
});
