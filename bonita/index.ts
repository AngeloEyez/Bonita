// bonita/index.ts
import { app, ipcMain } from 'electron';
import { IPCAction, IPCActionDataMap, IPCResponse } from 'app/bonita/ipc/ipc-types';
import log from 'app/bonita/utils/logger';
//import { handleReadExcel } from 'app/bonita/excel-handler'; // Excel 處理邏輯
import { getErrorMsg } from 'app/bonita/utils/utils';

class BonitaApp {
  initialize() {
    this._setupIpcHandlers();
    log.log('BonitaApp initialized');
  }

  // 封裝 IPC API
  private _setupIpcHandlers() {
    ipcMain.handle(
      'Gapi-action',
      async (_event, args: { action: IPCAction; data: IPCActionDataMap[IPCAction] }): Promise<IPCResponse> => {
        const { action, data } = args;

        switch (action) {
          case 'get-app-version':
            const version = app.getVersion();
            log.log(version);
            return { status: 'success', content: version };

          case 'perform-calculation':
            try {
              const result = await handleReadExcel(data);
              return { status: 'success', content: result };
            } catch (error) {
              return { status: 'error', message: getErrorMsg(error) };
            }

          default:
            throw new Error(`Unknown action: ${action}`);
        }
      }
    );
  }
}

async function handleReadExcel(data: IPCActionDataMap[IPCAction]): Promise<IPCResponse> {
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

const bonita = new BonitaApp();
export default bonita;
