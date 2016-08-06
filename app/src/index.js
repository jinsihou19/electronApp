"use strict";
const {ipcMain, app, BrowserWindow} = require('electron');
const subscribers = require('./subscribers');

app.on('ready', function () {
    var mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden',
        width: 800,
        height: 600
    });
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    mainWindow.closeDevTools();
    mainWindow.loadURL('file://' + __dirname + '/ui/index.html');
    ipcMain.on('openPrefs', function () {
        var prefsWindow = new BrowserWindow({
            width: 400,
            height: 400
        });
        prefsWindow.setAlwaysOnTop(true);
        prefsWindow.loadURL('file://' + __dirname + '/main/prefs.html');
    });
    subscribers.subscribers();
});


