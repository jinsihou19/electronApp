"use strict";
const {ipcMain, app, BrowserWindow} = require('electron');

app.on('ready', function () {
    var mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    mainWindow.closeDevTools();
    mainWindow.loadURL('file://' + __dirname + '/home_page/index.html');

    ipcMain.on('openPrefs', function () {
        var prefsWindow = new BrowserWindow({
            width: 400,
            height: 400
        });
        prefsWindow.setAlwaysOnTop(true);
        prefsWindow.loadURL('file://' + __dirname + '/prefs.html');
    });
});


