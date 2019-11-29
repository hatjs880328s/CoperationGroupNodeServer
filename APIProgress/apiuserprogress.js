/*
 * @Author: noah shan
 * @Date: 2019-11-29 16:13:23
 * @LastEditTime: 2019-11-29 16:22:00
 * @LastEditors: Please set LastEditors
 * @Description: 用户信息处理
 * @FilePath: /CoperationGroupNodeServer/APIProgress/apiuserprogress.js
 */



/// 创建用户信息
function creatorUser(app, userdbIns, dbinstance) {
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.apiconfig.post('/user', urlencodedParser, function (req, res) {
        console.log(req.body);
        userdbIns.addUserWith(dbinstance, req.body, function (result) {
            res.json({ 'result': result });
        });
    });
}

/// 创建用户信息
function updateUser(app, userdbIns, dbinstance) {
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.apiconfig.put('/user', urlencodedParser, function (req, res) {
        console.log(req.body);
        userdbIns.updateUserWith(dbinstance, req.body, function (result) {
            res.json({ 'result': result });
        });
    });
}

/// 获取用户信息
function updateUser(app, userdbIns, dbinstance) {
    app.apiconfig.get('/user', function (err, res) {
        userdbIns.getAlluser(dbinstance, function (result) {
            res.json(result);
        });
    })
}

module.exports = { creatorUser, updateUser };