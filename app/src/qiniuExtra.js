/**
 * Created by vito on 16/7/27.
 */
'use strict'
var qiniu = require("qiniu");
qiniu.conf.ACCESS_KEY = 'GYG9vMioxqbEgx-5HoAMAelD0zGdUrXT4UZ3w-d1';
qiniu.conf.SECRET_KEY = 'ObaIsbvxybKg_HX1bjvR8YvKarEhh-6spjYPlN-z';

const login = function (Access_Key, Secret_Key) {
    qiniu.conf.ACCESS_KEY = Access_Key;
    qiniu.conf.SECRET_KEY = Secret_Key;

//构建bucketmanager对象
    var client = new qiniu.rs.Client();

//你要测试的空间， 并且这个key在你空间中存在
//     bucket = 'Bucket_Name';
//     key = 'nodejs-logo.png';

//获取文件信息
    client.stat(bucket, key, function (err, ret) {
        if (!err) {
            console.log(ret.hash, ret.fsize, ret.putTime, ret.mimeType);
        } else {
            console.log(err);
        }
    });
};

const a = function (Access_Key, Secret_Key) {
    qiniu.conf.ACCESS_KEY = Access_Key;
    qiniu.conf.SECRET_KEY = Secret_Key;

    // qiniu.rsf.listPrefix('shopcdn', null, null, null, null, function (err, ret) {
    //     if (!err) {
    //         console.log(ret);
    //     } else {
    //         console.log(err);
    //     }
    // })
    buckets(function (err, ret) {
        if (!err) {
            console.log(ret);
        } else {
            console.log(err);
        }
    })
};

function buckets(callback) {
    let rpc = qiniu.rpc;
    let conf = qiniu.conf;
    let util = qiniu.util;
    var uri = conf.RS_HOST + '/buckets';
    var digest = util.generateAccessToken(uri, null);
    rpc.postWithoutForm(uri, digest, callback)
}

// a('GYG9vMioxqbEgx-5HoAMAelD0zGdUrXT4UZ3w-d1', 'ObaIsbvxybKg_HX1bjvR8YvKarEhh-6spjYPlN-z');

exports.login = login;
exports.buckets = buckets;
exports.listPrefix = qiniu.rsf.listPrefix;
