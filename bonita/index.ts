// bonita/index.ts
import { app, ipcMain } from 'electron';
import { IPCAction, IPCActionDataMap, IPCResponse } from 'app/bonita/ipc/ipc-types';
import log from 'app/bonita/utils/logger';
import { getErrorMsg } from 'app/bonita/utils/utils';

import path from 'path';

export class BonitaApp {
  async initialize() {
    this._setupIpcHandlers();
    log.log('BonitaApp initialized');

    log.log(app.getPath('exe'));
    log.log(path.join(app.getPath('exe'), '../conf.db'));
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

          case 'read-Excel':
            return { status: 'success', content: 'read-Excel' };

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

// interface Bonita extends ExcelMixin {}
// applyMixins(Bonita, [ExcelMixin]);
