/*
 * @Author: noah shan
 * @Date: 2019-11-29 16:13:23
 * @LastEditTime: 2019-11-30 11:29:10
 * @LastEditors: Please set LastEditors
 * @Description: 用户信息处理
 * @FilePath: /CoperationGroupNodeServer/APIProgress/apiuserprogress.js
 */



/// 创建用户信息
function creatorUser(app, userdbIns, dbinstance) {
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.apiconfig.post('/user', urlencodedParser, function (req, res) {
        console.log('create user invoke.');
        userdbIns.addUserWith(dbinstance, req.body, function (result) {
            res.json({ 'result': result });
        });
    });
}

/// 更新用户信息
function updateUser(app, userdbIns, dbinstance) {
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.apiconfig.put('/user', urlencodedParser, function (req, res) {
        console.log('update user invoke.');
        userdbIns.updateUserWith(dbinstance, req.body, function (result) {
            res.json({ 'result': result });
        });
    });
}

/// 获取用户信息
function getUser(app, userdbIns, dbinstance) {
    app.apiconfig.get('/user', function (err, res) {
        console.log('get user invoke.');
        userdbIns.getAlluser(dbinstance, function (result) {
            res.json(result);
        });
    })
}

/// 根据用户id获取用户信息
function getUserwithID(app, userdbIns, dbinstance) {
    app.apiconfig.get('/user/:id', function (req, res) {
        console.log('get someone user invoke.');
        var id = req.params.id;        
        userdbIns.getUserWith(dbinstance, id, function(result) {
            console.log(result);
            res.json(result);
        });
    })
}

/// 根据用户id获取用户信息
function deleteUser(app, userdbIns, dbinstance) {
    app.apiconfig.delete('/user/:id', function (req, res) {
        console.log('delete someone user invoke.');
        var id = req.params.id;
        userdbIns.deleteUser(dbinstance, id, function(result) {
            res.json({ 'result': result });
        })
    })
}

module.exports = { creatorUser, updateUser, getUser, getUserwithID, deleteUser };