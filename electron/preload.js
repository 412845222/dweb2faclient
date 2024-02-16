//preload.js
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

contextBridge.exposeInMainWorld('electron', {
  setWindowTitleBarStyle: (color) => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .title-bar {
        background-color: ${color} !important;
      }
    `;
    document.head.appendChild(styleElement);
  }
});

contextBridge.exposeInMainWorld("dweb2fa",{
  send:(msg)=>{
    ipcRenderer.send('dweb2fa',msg)
  },
  onec:(channel,callback)=>{
    ipcRenderer.once(channel,(event,arg)=>{
      console.log("preload.js:ipcRenderer.once")
      // console.log(arg)
      callback(arg)
    })
  }
})
