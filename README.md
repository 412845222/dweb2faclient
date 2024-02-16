# 本地验证器

## 项目启动

### 热更新开发模式
    npm install
    npm run dev //vue前端运行http://localhost:5173

    // electron\electron_main.js
    // 修改
    // 加载 index.html
    // mainWindow.loadFile('index.html')
    // mainWindow.loadFile(path.join(__dirname, './dist/index.html'))
    mainWindow.loadURL("http://localhost:5173");

    npm run electron

### 项目编译

1.编译vue前端：

    npm run build   
    //移动dist文件夹到electron文件夹下
    // 加载 index.html
    // mainWindow.loadFile('index.html')
    mainWindow.loadFile(path.join(__dirname, './dist/index.html'))
    // mainWindow.loadURL("http://localhost:5173");

2.编译electron桌面程序exe

    npm run electron:builder


### 联系方式

邮箱：dwebnine@dweb.club
个人主页：https://www.dweb.club
B站主页：https://space.bilibili.com/22690066
Q群：611516237


