/*
 * @Author: your name
 * @Date: 2019-11-30 15:05:17
 * @LastEditTime: 2020-06-10 20:13:09
 * @LastEditors: Please set LastEditors
 * @Description: 文件夹处理
 * @FilePath: /CoperationGroupNodeServer/APIProgress/apifolderprogress.js
 */

/// 创建file信息
function creatorFolder(app, FolderdbIns, dbinstance) {
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.apiconfig.post('/folder', urlencodedParser, function (req, res) {
        console.log('create folder invoke.');
        FolderdbIns.addFolderWith(dbinstance(), req.body, function (result) {
            res.json({ 'result': result });
        });   
    });
}

/// 更新用户信息
function updateFolder(app, FolderDBIns, dbinstance) {
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.apiconfig.put('/folder', urlencodedParser, function (req, res) {
        console.log('update folder invoke.');
        FolderDBIns.updateFolderWith(dbinstance, req.body, function (result) {
            res.json({ 'result': result });
        })
    });
}

/// 获取用户信息
function getFolder(app, FolderdbIns, dbinstance) {
    app.apiconfig.get('/folder', function (err, res) {
        console.log('get folder invoke.');
        FolderdbIns.getAllFolder(dbinstance, function (result) {
            res.json(result);
        });
    })
}

/// 根据用户id获取用户信息
function getFolderwithID(app, FolderdbIns, dbinstance) {
    app.apiconfig.get('/folder/:id', function (req, res) {
        console.log('get someone folder invoke.');
        var id = req.params.id;
        FolderdbIns.getFolderWith(dbinstance(), id, function (req) {
            res.json(req)[0];
        });
    })
}

/// 根据用户id删除用户信息
function deleteFolder(app, FolderdbIns, dbinstance) {
    app.apiconfig.delete('/folder/:id', function (req, res) {
        console.log('delete someone folder invoke.');
        var id = req.params.id;
        FolderdbIns.deleteFolder(dbinstance(), id, function (req) {
            res.json({ 'result': req });
        })
    });
}

/// 根据用户id和type获取某一类文件夹
function getFolders(app, FolderdbIns, dbinstance) {
    app.apiconfig.get('/folders/:id/:type', function (req, res) {
        var uid = req.params.id;
        var type = req.params.type;
        console.log(`get someone folders invoke(use type: ${type} * id: ${uid}).`);
        FolderdbIns.getFoldersWith(dbinstance(), uid, type, function (req) {
            res.json(req);
        });
    });
}

/// 根据folderid获取协同组，组信息[包含文件、用户等；不单单是组信息]
function getCoperationFolders(app, dbinstance) {
    app.apiconfig.get('/coperationgroup/:id', async function (req, res) {

        // users db progress ins
        const userdbIns = require('../DBProgress/progressuser');
        // file db progress ins
        const filedbIns = require('../DBProgress/progressfile');
        // folder db progress ins
        const folderdbIns = require('../DBProgress/progressfolder');

        var coperid = req.params.id;

        console.log('get coperation group info[incloud users & files]');

        // 1.获取folderdic
        await folderdbIns.getFolderWith(dbinstance(), coperid, async function (req) {
            console.log(req['users']);
            console.log(req['folderid']);
            // 2.获取所有user信息 
            var userList = await userdbIns.getUsersWith(dbinstance(), req['users']);
            // 3.获取文件信息
            var fileList = await filedbIns.getFilesWithFolderid(dbinstance(), req['folderid'], function (req) { })
            for (i = 0 ; i < fileList.length ; i++) {
                fileList[i]['content'] = ''
            }
            req['realUsers'] = userList;
            req['realFiles'] = fileList;
            res.json(req);
        });


    });
}

module.exports = { creatorFolder, updateFolder, getFolder, getFolderwithID, deleteFolder, getFolders, getCoperationFolders };