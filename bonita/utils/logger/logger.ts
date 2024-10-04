import log from 'electron-log';
import { ipcRenderer } from 'electron';

//设置格式
log.transports.console.format = '{h}:{i}:{s}.{ms}[{processType}][{level}] {text}';

// 檢查是否在渲染器進程
if (ipcRenderer) {
  log.transports.console.format = log.transports.console.format.replace('{processType}', 'R');
} else {
  log.initialize();
  log.transports.console.format = log.transports.console.format.replace('{processType}', 'M');
}

export default log;
