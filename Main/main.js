/*
 * @Author: noah shan
 * @Date: 2019-11-28 16:06:10
 * @LastEditTime: 2020-09-03 11:08:25
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
/// 首先将这个连接封装成一个module，然后向外导出连接的方法‘handleDisconnection’和‘connection’；
/// 在你需要的地方全局调用handleDisconnection方法，具体不多说了，怕暴露智商，这里要特别注意的是，在使用连接‘connection’的时候，
/// 这个‘connection’不能作为全局变量，应该在每一次执行数据请求的时候去获取，不然不能获取到最新的‘connection’。
/// var dbinstance = mysql.handleDisconnection;

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
// TSSC db progress ins
const tsscdbins = require('../DBProgress/progressTSSC');


/// 用户的api服务监听
var userAPI = require('../APIProgress/apiuserprogress');
userAPI.creatorUser(app, userdbIns, mysql.handleDisconnection);
userAPI.updateUser(app, userdbIns, mysql.handleDisconnection);
userAPI.getUser(app, userdbIns, mysql.handleDisconnection);
userAPI.getUserwithID(app, userdbIns, mysql.handleDisconnection);
userAPI.deleteUser(app, userdbIns, mysql.handleDisconnection);

/// 文件的api服务监听
var fileAPI = require('../APIProgress/apifileprogress');
fileAPI.creatorFile(app, filedbIns, mysql.handleDisconnection);
fileAPI.locationTracking(app, filedbIns, mysql.handleDisconnection);
fileAPI.getFilewithID(app, filedbIns, mysql.handleDisconnection);
fileAPI.getFile(app, filedbIns, mysql.handleDisconnection);
fileAPI.updateFile(app, filedbIns, mysql.handleDisconnection);
fileAPI.deleteFile(app, filedbIns, mysql.handleDisconnection);
fileAPI.getOneFolderFiles(app, filedbIns, mysql.handleDisconnection);
fileAPI.getOneuserNewestFiles(app, filedbIns, mysql.handleDisconnection);
fileAPI.editFile(app, redisDb);
fileAPI.editFileEnd(app, redisDb);

/// 文件夹的api服务监听
var folderAPI = require('../APIProgress/apifolderprogress');
folderAPI.creatorFolder(app, folderdbIns, mysql.handleDisconnection);
folderAPI.getFolderwithID(app, folderdbIns, mysql.handleDisconnection);
folderAPI.getFolder(app, folderdbIns, mysql.handleDisconnection);
folderAPI.updateFolder(app, folderdbIns, mysql.handleDisconnection);
folderAPI.deleteFolder(app, folderdbIns, mysql.handleDisconnection);
folderAPI.getFolders(app, folderdbIns, mysql.handleDisconnection);
folderAPI.getCoperationFolders(app, mysql.handleDisconnection);

/// cmd的api服务监听
var cmdAPI = require('../APIProgress/apicmdprogress');
cmdAPI.creatorCMD(app, cmddbIns, mysql.handleDisconnection);
cmdAPI.getCMDwithID(app, cmddbIns, mysql.handleDisconnection);
cmdAPI.getCMD(app, cmddbIns, mysql.handleDisconnection);
cmdAPI.updateCMD(app, cmddbIns, mysql.handleDisconnection);
cmdAPI.deleteCMD(app, cmddbIns, mysql.handleDisconnection);
cmdAPI.progressCMD(app, cmddbIns, mysql.handleDisconnection);

/// TSSC的api服务监听
var tsscAPI = require('../APIProgress/apiTSSCprogress');
tsscAPI.syncTSSCInfos(app, tsscdbins, mysql.handleDisconnection);
tsscAPI.syncTSSCAuthorsInfo(app, tsscdbins, mysql.handleDisconnection);
tsscAPI.syncSCInfos(app, tsscdbins, mysql.handleDisconnection);
tsscAPI.syncSCAuthorsInfo(app, tsscdbins, mysql.handleDisconnection);


/// 开启监听
var server = app.apiconfig.listen(8081, appconfig.hostapi, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("监听地址为 http://%s:%s", host, port);
})