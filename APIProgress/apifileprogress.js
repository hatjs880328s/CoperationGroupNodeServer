/*
 * @Author: your name
 * @Date: 2019-11-30 10:54:46
 * @LastEditTime: 2019-11-30 14:38:19
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
function updateFile(app, userdbIns, dbinstance) {
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.apiconfig.put('/file', urlencodedParser, function (req, res) {
        console.log('update file invoke.');
        userdbIns.updateUserWith(dbinstance, req.body, function (result) {
            res.json({ 'result': result });
        });
    });
}

/// 获取用户信息
function getFile(app, userdbIns, dbinstance) {
    app.apiconfig.get('/file', function (err, res) {
        console.log('get file invoke.');
        userdbIns.getAlluser(dbinstance, function (result) {
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

/// 根据用户id获取用户信息
function deleteFile(app, userdbIns, dbinstance) {
    app.apiconfig.delete('/file/:id', function (req, res) {
        console.log('delete someone file invoke.');
        var id = req.params.id;
        userdbIns.deleteUser(dbinstance, id, function(result) {
            res.json({ 'result': result });
        })
    })
}

module.exports = { creatorFile, updateFile, getFile, getFilewithID, deleteFile };