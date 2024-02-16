// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('ipcRenderer', {
//   send: (channel: string, data: any) => {
//     ipcRenderer.send(channel, data);
//   },
//   on: (channel: string, callback: (arg0: any) => void) => {
//     ipcRenderer.on(channel, (event, ...args) => {
//       callback(args);
//     });
//   },
// });