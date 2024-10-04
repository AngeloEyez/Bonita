// bonita/utils/logger/logger-renderer.ts
import log from 'electron-log/renderer';
import { logFormat } from './logger-config';

log.transports.console.format = logFormat;

export default log;
