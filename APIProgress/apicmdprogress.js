/*
 * @Author: NOAH SHAN
 * @Date: 2019-11-30 10:54:46
 * @LastEditTime: 2019-12-02 09:34:05
 * @LastEditors: Please set LastEditors
 * @Description: CMD处理
 * @FilePath: /CoperationGroupNodeServer/APIProgress/apifileprogress.js
 */

/// 创建file信息
function creatorCMD(app, userdbIns, dbinstance) {
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.apiconfig.post('/CMD', urlencodedParser, function (req, res) {
        console.log('create cmd invoke.');
        userdbIns.addFileWith(dbinstance, req.body, function(result) {
            res.json({ 'result': result });
        });
    });
}

/// 更新用户信息
function updateCMD(app, fileDBIns, dbinstance) {
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.apiconfig.put('/CMD', urlencodedParser, function (req, res) {
        console.log('update cmd invoke.');
        fileDBIns.updateFileWith(dbinstance, req.body, function(result) {
            res.json({ 'result': result });
        })
    });
}

/// 获取用户信息
function getCMD(app, userdbIns, dbinstance) {
    app.apiconfig.get('/CMD', function (err, res) {
        console.log('get cmd invoke.');
        userdbIns.getAllFile(dbinstance, function (result) {
            res.json(result);
        });
    })
}

/// 根据接受者用户id获取指令信息
function getCMDwithID(app, userdbIns, dbinstance) {
    app.apiconfig.get('/CMD/:receiver', function (req, res) {
        console.log('get someone all cmd invoke.');
        var id = req.params.id;
        userdbIns.getFileWith(dbinstance, id, function(req) {
            res.json(req)[0];
        });
    })
}

/// 根据用户id删除用户信息
function deleteCMD(app, userdbIns, dbinstance) {
    app.apiconfig.delete('/CMD/:id', function(req, res) {
        console.log('delete someone cmd invoke.');
        var id = req.params.id;
        userdbIns.deleteFile(dbinstance, id, function(req) {
            res.json({ 'result': req });
        })
    });
}

module.exports = { creatorCMD, updateCMD, getCMD, getCMDwithID, deleteCMD };