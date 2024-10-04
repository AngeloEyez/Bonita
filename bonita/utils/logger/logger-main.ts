// bonita/utils/logger/logger-main.ts
import log from 'electron-log/main';
import { logFormat } from './logger-config';

log.initialize();
log.transports.console.format = logFormat;

export default log;
