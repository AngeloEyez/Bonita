// src-bonita/ipc/ipc-api.ts

import { IPCAction, IPCActionDataMap, IPCResponse } from './ipc-types';

class IPC {
  async send<A extends IPCAction>(
    action: A,
    data: IPCActionDataMap[A]
  ): Promise<IPCResponse> {
    if (!window.bonitaAPI || !window.bonitaAPI.sendAction) {
      throw new Error('Bonita API not available');
    }
    return window.bonitaAPI.sendAction(action, data);
  }
}

export const ipc = new IPC();
