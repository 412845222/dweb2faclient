const { app, BrowserWindow } = require("electron");
const path = require("path");
const { Dweb2FA } = require("./2FA/Dweb2FA");
const dweb2fa = new Dweb2FA();

const createWindow = () => {
  // 创建浏览窗口
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    backgroundColor: "#ffffff00",
    icon: path.join(__dirname, './imgs/Dweb.png'),
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // 隐藏默认菜单
  // Menu.setApplicationMenu(null);

  // 加载 index.html
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL("http://localhost:5173");

  // 打开开发工具
  mainWindow.webContents.openDevTools()
};

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
