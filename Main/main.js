/*
 * @Author: noah shan
 * @Date: 2019-11-28 16:06:10
 * @LastEditTime: 2019-11-29 16:25:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNode/ConnectDB.js
 */

/// config instance
const appconfig = require('../Config/config');

/// mysql instance
const mysql = require('../UTI/ConnectDB');

/// api instance
const app = require('../UTI/ConnectAPI');

/// db config 
var dbinstance = mysql.mysqlconnect();

/// api config
app.config();

// users db progress ins
const userdbIns = require('../DBProgress/progressuser');


/// 用户的
var userAPI = require('../APIProgress/apiuserprogress');
userAPI.creatorUser(app, userdbIns, dbinstance);

/// 开启监听
var server = app.apiconfig.listen(8081, appconfig.hostapi, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("监听地址为 http://%s:%s", host, port);
})