import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import os from 'os';

// BONITA
import {
  IPCAction,
  IPCActionDataMap,
  IPCResponse,
} from '../bonita/ipc/ipc-types';
import { getErrorMsg } from 'app/bonita/utils/utils';

import log from 'electron-log/main';
log.initialize();
log.transports.console.format =
  '{h}:{i}:{s}.{ms}[{processType}][{level}] {text}';

//

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

let mainWindow: BrowserWindow | undefined;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});

// BONITA
// 封裝 IPC API
ipcMain.handle(
  'api-action',
  async (
    _event,
    args: { action: IPCAction; data: IPCActionDataMap[IPCAction] }
  ) => {
    const { action, data } = args;

    switch (action) {
      case 'get-app-version':
        log.log(app.getVersion());
        return { status: 'success', content: app.getVersion() };

      case 'perform-calculation':
        return await handleReadExcel(data);

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  }
);

async function handleReadExcel(
  data: IPCActionDataMap[IPCAction]
): Promise<IPCResponse> {
  try {
    if (!data) {
      throw new Error('No data provided for perform-calculation');
    }
    const { a, b } = data;
    const res: IPCResponse = {
      status: 'success',
      content: a + b,
    };
    return res;
  } catch (error) {
    return { status: 'error', message: getErrorMsg(error) };
  }
}
