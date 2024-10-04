// ==========================================================
// log-electron
//
// main process: import { log } from 'app/bonita/utils/utils';
// renderer process:

import log from 'electron-log';

//设置格式
log.transports.console.format = '{h}:{i}:{s}.{ms}[{processType}][{level}] {text}';

const isMain = typeof process === 'object' && process.type === 'browser';
if (!isMain) {
  // 在渲染進程，重新導入 log 模組，以確保使用 renderer 版本
  //import('electron-log/renderer');
  // Echo console.log() etc. to the terminal using electron logger.
Object.assign(console, log.functions);
} else {
  // 在主進程
  log.initialize();
}

export default log;
