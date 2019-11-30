/*
 * @Author: noah shan
 * @Date: 2019-11-28 16:06:10
 * @LastEditTime: 2019-11-30 15:16:29
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
// file db progress ins
const filedbIns = require('../DBProgress/progressfile');
// folder db progress ins
const folderdbIns = require('../DBProgress/progressfolder');


/// 用户的api服务监听
var userAPI = require('../APIProgress/apiuserprogress');
userAPI.creatorUser(app, userdbIns, dbinstance);
userAPI.updateUser(app, userdbIns, dbinstance);
userAPI.getUser(app, userdbIns, dbinstance);
userAPI.getUserwithID(app, userdbIns, dbinstance);
userAPI.deleteUser(app, userdbIns, dbinstance);

/// 文件的api服务监听
var fileAPI = require('../APIProgress/apifileprogress');
fileAPI.creatorFile(app, filedbIns, dbinstance);
fileAPI.getFilewithID(app, filedbIns, dbinstance);
fileAPI.getFile(app, filedbIns, dbinstance);
fileAPI.updateFile(app, filedbIns, dbinstance);
fileAPI.deleteFile(app, filedbIns, dbinstance);

/// 文件夹的api服务监听
var folderAPI = require('../APIProgress/apifolderprogress');
folderAPI.creatorFolder(app, folderdbIns, dbinstance);
folderAPI.getFolderwithID(app, folderdbIns, dbinstance);
folderAPI.getFolder(app, folderdbIns, dbinstance);
folderAPI.updateFolder(app, folderdbIns, dbinstance);
folderAPI.deleteFolder(app, folderdbIns, dbinstance);


/// 开启监听
var server = app.apiconfig.listen(8081, appconfig.hostapi, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("监听地址为 http://%s:%s", host, port);
})