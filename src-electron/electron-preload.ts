/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.ts you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */

// BONITA
import { contextBridge, ipcRenderer } from 'electron';
import { IPCAction, IPCActionDataMap, IPCResponse } from '../bonita/ipc/ipc-types';

contextBridge.exposeInMainWorld('bonitaAPI', {
  sendAction: async <A extends IPCAction>(action: A, data: IPCActionDataMap[A]): Promise<IPCResponse> => {
    return ipcRenderer.invoke('Gapi-action', { action, data });
  },
});
