/*
 * @Author: noah shan
 * @Date: 2019-11-28 16:06:10
 * @LastEditTime: 2019-12-04 14:08:49
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

/// redis instance
const redisConfig = require('../UTI/ConnectRedis');

/// db config 
var dbinstance = mysql.mysqlconnect();

/// api config
app.config();

/// redis config
var redisDb = redisConfig.redisConfig();

// users db progress ins
const userdbIns = require('../DBProgress/progressuser');
// file db progress ins
const filedbIns = require('../DBProgress/progressfile');
// folder db progress ins
const folderdbIns = require('../DBProgress/progressfolder');
// CMD db progress ins
const cmddbIns = require('../DBProgress/progresscmd');


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
fileAPI.getOneFolderFiles(app, filedbIns, dbinstance);
fileAPI.getOneuserNewestFiles(app, filedbIns, dbinstance);
fileAPI.editFile(app, redisDb);
fileAPI.editFileEnd(app, redisDb);

/// 文件夹的api服务监听
var folderAPI = require('../APIProgress/apifolderprogress');
folderAPI.creatorFolder(app, folderdbIns, dbinstance);
folderAPI.getFolderwithID(app, folderdbIns, dbinstance);
folderAPI.getFolder(app, folderdbIns, dbinstance);
folderAPI.updateFolder(app, folderdbIns, dbinstance);
folderAPI.deleteFolder(app, folderdbIns, dbinstance);
folderAPI.getFolders(app, folderdbIns, dbinstance);
folderAPI.getCoperationFolders(app, dbinstance);

/// cmd的api服务监听
var cmdAPI = require('../APIProgress/apicmdprogress');
cmdAPI.creatorCMD(app, cmddbIns, dbinstance);
cmdAPI.getCMDwithID(app, cmddbIns, dbinstance);
cmdAPI.getCMD(app, cmddbIns, dbinstance);
cmdAPI.updateCMD(app, cmddbIns, dbinstance);
cmdAPI.deleteCMD(app, cmddbIns, dbinstance);
cmdAPI.progressCMD(app, cmddbIns, dbinstance);


/// 开启监听
var server = app.apiconfig.listen(8081, appconfig.hostapi, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("监听地址为 http://%s:%s", host, port);
})