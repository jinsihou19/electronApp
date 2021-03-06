"use strict";
const {ipcMain, app, BrowserWindow} = require('electron');
const subscribers = require('./subscribers');

app.on('ready', function () {
    var mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden',
        width: 1000,
        height: 800
    });
    mainWindow.on('closed', ()=> {
        mainWindow = null;
    });
    mainWindow.closeDevTools();
    mainWindow.loadURL('file://' + __dirname + '/../ui/index.html');
    ipcMain.on('openPrefs', ()=> {
        var prefsWindow = new BrowserWindow({
            width: 400,
            height: 400
        });
        prefsWindow.setAlwaysOnTop(true);
        prefsWindow.loadURL('file://' + __dirname + '/prefs.html');
    });
    subscribers.subscribers();
});
app.on('window-all-closed', ()=> {
    app.quit()
});

