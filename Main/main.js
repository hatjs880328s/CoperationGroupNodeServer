/*
 * @Author: noah shan
 * @Date: 2019-11-28 16:06:10
 * @LastEditTime: 2020-06-04 16:43:45
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
var dbinstance = mysql.handleDisconnection();

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
userAPI.creatorUser(app, userdbIns, mysql.connection);
userAPI.updateUser(app, userdbIns, mysql.connection);
userAPI.getUser(app, userdbIns, mysql.connection);
userAPI.getUserwithID(app, userdbIns, mysql.connection);
userAPI.deleteUser(app, userdbIns, mysql.connection);

/// 文件的api服务监听
var fileAPI = require('../APIProgress/apifileprogress');
fileAPI.creatorFile(app, filedbIns, mysql.connection);
fileAPI.getFilewithID(app, filedbIns, mysql.connection);
fileAPI.getFile(app, filedbIns, mysql.connection);
fileAPI.updateFile(app, filedbIns, mysql.connection);
fileAPI.deleteFile(app, filedbIns, mysql.connection);
fileAPI.getOneFolderFiles(app, filedbIns, mysql.connection);
fileAPI.getOneuserNewestFiles(app, filedbIns, mysql.connection);
fileAPI.editFile(app, redisDb);
fileAPI.editFileEnd(app, redisDb);

/// 文件夹的api服务监听
var folderAPI = require('../APIProgress/apifolderprogress');
folderAPI.creatorFolder(app, folderdbIns, mysql.connection);
folderAPI.getFolderwithID(app, folderdbIns, mysql.connection);
folderAPI.getFolder(app, folderdbIns, mysql.connection);
folderAPI.updateFolder(app, folderdbIns, mysql.connection);
folderAPI.deleteFolder(app, folderdbIns, mysql.connection);
folderAPI.getFolders(app, folderdbIns, mysql.connection);
folderAPI.getCoperationFolders(app, mysql.connection);

/// cmd的api服务监听
var cmdAPI = require('../APIProgress/apicmdprogress');
cmdAPI.creatorCMD(app, cmddbIns, mysql.connection);
cmdAPI.getCMDwithID(app, cmddbIns, mysql.connection);
cmdAPI.getCMD(app, cmddbIns, mysql.connection);
cmdAPI.updateCMD(app, cmddbIns, mysql.connection);
cmdAPI.deleteCMD(app, cmddbIns, mysql.connection);
cmdAPI.progressCMD(app, cmddbIns, mysql.connection);

/// TSSC的api服务监听
var tsscAPI = require('../APIProgress/apiTSSCprogress');
tsscAPI.syncTSSCInfos(app, tsscdbins, mysql.connection);
tsscAPI.syncTSSCAuthorsInfo(app, tsscdbins, mysql.connection);
tsscAPI.syncSCInfos(app, tsscdbins, mysql.connection);
tsscAPI.syncSCAuthorsInfo(app, tsscdbins, mysql.connection);


/// 开启监听
var server = app.apiconfig.listen(8081, appconfig.hostapi, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("监听地址为 http://%s:%s", host, port);
})