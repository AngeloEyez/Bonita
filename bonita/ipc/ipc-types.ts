/* eslint-disable @typescript-eslint/no-explicit-any */

export type IPCAction = 'get-app-version' | 'perform-calculation';

export interface IPCActionDataMap {
  'get-app-version': undefined;
  'perform-calculation': { a: number; b: number };
}

export interface IPCActionResponseMap {
  'get-app-version': string;
  'perform-calculation': number;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPCResponse {
  status: 'success' | 'error';
  content?: any;
  message?: string;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-line @typescript-eslint/no-explicit-any
