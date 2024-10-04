

export function getErrorMsg(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}


// ==========================================================
// log-electron
//
// main process: import { log } from 'app/bonita/utils/utils';
// renderer process:
import { ipcRenderer } from 'electron';
import logMain from './logger/logger-main';
import logRenderer from './logger/logger-renderer';


// 如果可以访问 ipcRenderer，说明是在渲染进程，否则是在主进程
export const log: typeof logRenderer = ipcRenderer ? logRenderer : logMain;
