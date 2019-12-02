/*
 * @Author: your name
 * @Date: 2019-11-30 15:05:17
 * @LastEditTime: 2019-12-02 16:53:29
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
        FolderdbIns.addFolderWith(dbinstance, req.body, function(result) {
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
        FolderDBIns.updateFolderWith(dbinstance, req.body, function(result) {
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
        FolderdbIns.getFolderWith(dbinstance, id, function(req) {
            res.json(req)[0];
        });
    })
}

/// 根据用户id删除用户信息
function deleteFolder(app, FolderdbIns, dbinstance) {
    app.apiconfig.delete('/folder/:id', function(req, res) {
        console.log('delete someone folder invoke.');
        var id = req.params.id;
        FolderdbIns.deleteFolder(dbinstance, id, function(req) {
            res.json({ 'result': req });
        })
    });
}

module.exports = { creatorFolder, updateFolder, getFolder, getFolderwithID, deleteFolder };