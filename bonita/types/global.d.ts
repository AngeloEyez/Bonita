export {};

declare global {
  interface Window {
    bonitaAPI: {
      sendAction: <A extends import('../ipc/ipc-types').IPCAction>(
        action: A,
        data: import('../ipc/ipc-types').IPCActionDataMap[A]
      ) => Promise<import('../ipc/ipc-types').IPCResponse>;
    };
  }
}
