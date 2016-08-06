"use strict";
var remote = require('electron').remote;
var ipcRenderer = require('electron').ipcRenderer;
var Menu = remote.Menu;
var menu = Menu.buildFromTemplate([{
    label: 'electron',
    submenu: [{
        label: '首选项...',
        click: function () {
            ipcRenderer.send('openPrefs');//使用进程中通信进行交互
        }
    }]
}, {
    label: '高级',
    submenu: [{
        label: '调试工具开关',
        accelerator: (() => {
            return (process.platform === 'darwin') ? 'Alt+Command+I' : 'Ctrl+Shift+I';
        })(),
        click (item, focusedWindow) {
            if (focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }
    }]
}
]);
Menu.setApplicationMenu(menu);