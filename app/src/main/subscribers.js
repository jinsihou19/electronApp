/**
 * Created by vito on 16/7/30.
 */
const {ipcMain, BrowserWindow} = require('electron');
var {login, buckets, listPrefix} = require('./qiniuExtra');

const subscribers = function () {


    ipcMain.on('login', function (e, Access_Key, Secret_Key) {
        login(Access_Key, Secret_Key);
    });

    ipcMain.on('buckets', e=> {
        buckets((err, ret)=> {
            e.sender.send('buckets-reply', ret);
        });
    });

    ipcMain.on('list_file', (e, bucket)=> {
        listPrefix(bucket, null, null, null, null, (err, ret)=> {
            e.sender.send('list_file-reply', ret);
        });
    });
};

exports.subscribers = subscribers;
