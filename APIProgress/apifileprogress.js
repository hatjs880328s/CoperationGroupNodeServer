/*
 * @Author: your name
 * @Date: 2019-11-30 10:54:46
 * @LastEditTime: 2019-12-02 16:57:38
 * @LastEditors: Please set LastEditors
 * @Description: file信息处理
 * @FilePath: /CoperationGroupNodeServer/APIProgress/apifileprogress.js
 */

/// 创建file信息
function creatorFile(app, userdbIns, dbinstance) {
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.apiconfig.post('/file', urlencodedParser, function (req, res) {
        console.log('create file invoke.');
        userdbIns.addFileWith(dbinstance, req.body, function(result) {
            res.json({ 'result': result });
        });
    });
}

/// 更新用户信息
function updateFile(app, fileDBIns, dbinstance) {
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.apiconfig.put('/file', urlencodedParser, function (req, res) {
        console.log('update file invoke.');
        fileDBIns.updateFileWith(dbinstance, req.body, function(result) {
            res.json({ 'result': result });
        })
    });
}

/// 获取用户信息
function getFile(app, userdbIns, dbinstance) {
    app.apiconfig.get('/file', function (err, res) {
        console.log('get file invoke.');
        userdbIns.getAllFile(dbinstance, function (result) {
            res.json(result);
        });
    })
}

/// 根据用户id获取用户信息
function getFilewithID(app, userdbIns, dbinstance) {
    app.apiconfig.get('/file/:id', function (req, res) {
        console.log('get someone file invoke.');
        var id = req.params.id;
        userdbIns.getFileWith(dbinstance, id, function(req) {
            res.json(req)[0];
        });
    })
}

/// 根据folderid获取此文件夹下所有文件
function getOneFolderFiles(app, filedbIns, dbinstance) {
    app.apiconfig.get('/folder/content/:id', function(req, res) {
        console.log('get someone folder all files.');
        var id = req.params.id;
        filedbIns.getFilesWithFolderid(dbinstance, id, function(req) {
            res.json(req)
        });
    });
}

/// 根据用户id删除用户信息
function deleteFile(app, userdbIns, dbinstance) {
    app.apiconfig.delete('/file/:id', function(req, res) {
        console.log('delete someone file invoke.');
        var id = req.params.id;
        userdbIns.deleteFile(dbinstance, id, function(req) {
            res.json({ 'result': req });
        })
    });
}

module.exports = { creatorFile, updateFile, getFile, getFilewithID, deleteFile, getOneFolderFiles };