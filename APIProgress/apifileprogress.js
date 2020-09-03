/*
 * @Author: your name
 * @Date: 2019-11-30 10:54:46
 * @LastEditTime: 2020-09-03 11:08:14
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
        userdbIns.addFileWith(dbinstance(), req.body, function(result) {
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
        fileDBIns.updateFileWith(dbinstance(), req.body, function(result) {
            res.json({ 'result': result });
        })
    });
}

/// 获取用户信息
function getFile(app, userdbIns, dbinstance) {
    app.apiconfig.get('/file', function (err, res) {
        console.log('get file invoke.');
        userdbIns.getAllFile(dbinstance(), function (result) {
            res.json(result);
        });
    })
}

/// 根据用户id获取用户信息
function getFilewithID(app, userdbIns, dbinstance) {
    app.apiconfig.get('/file/:id', function (req, res) {
        console.log('get someone file invoke.');
        var id = req.params.id;
        userdbIns.getFileWith(dbinstance(), id, function(req) {
            res.json(req)[0];
        });
    })
}

/// 根据folderid获取此文件夹下所有文件
function getOneFolderFiles(app, filedbIns, dbinstance) {
    app.apiconfig.get('/folder/content/:id', function(req, res) {
        console.log('get someone folder all files.');
        var id = req.params.id;
        filedbIns.getFilesWithFolderid(dbinstance(), id, function(req) {
            res.json(req)
        });
    });
}

/// 根据folderid获取此文件夹下所有文件
function getOneuserNewestFiles(app, filedbIns, dbinstance) {
    app.apiconfig.get('/files/:id', function(req, res) {
        console.log('get someone folder all files.');
        var id = req.params.id;
        filedbIns.getoneuserNewestFiles(dbinstance(), id, function(req) {
            res.json(req)
        });
    });
}

/// 根据用户id删除用户信息
function deleteFile(app, userdbIns, dbinstance) {
    app.apiconfig.delete('/file/:id', function(req, res) {
        console.log('delete someone file invoke.');
        var id = req.params.id;
        userdbIns.deleteFile(dbinstance(), id, function(req) {
            res.json({ 'result': req });
        })
    });
}

/// 想要编辑一个协同文件 [需要查看是否别占用;占用返回false,否则返回ture，并写入一个key;如果是自己占用也返回true]
function editFile(app, redisDb) {
    app.apiconfig.get('/editfile/:id/:username', function(req, res) {
        console.log('should edit someone file invoke.');
        var fileid = req.params.id;
        var userid = req.params.username;
        var dbprogress = require('../RedisProgress/radisprogress')
        dbprogress.getKey(redisDb, fileid, function(result, value) {

            console.log('result value is ' + value);
            if (result) {
                if (value == userid) {
                    res.json({"result": true, "whoEdit": value == null ? '' : value});
                } else {
                    res.json({"result": false, "whoEdit": value == null ? '' : value});
                }
            } else {
                dbprogress.saveKey(redisDb, fileid, userid);
                res.json({"result": true, "whoEdit": ''});
            }
        })
    });
}

/// 结束编辑协同文件
function editFileEnd(app, redisDb) {
    app.apiconfig.delete('/editfile/:id', function(req, res) {
        console.log('end edit someone file invoke.');
        var id = req.params.id;
        var dbprogress = require('../RedisProgress/radisprogress')
        dbprogress.deleteKey(redisDb, id, function(result) {
            res.json({'result': result});
        })
    })
}

/// 地理位置信息追踪
function locationTracking(app, userdbIns, dbinstance) {
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.apiconfig.post('/locationTracking', urlencodedParser, function (req, res) {
        console.log('location tracking invoke.');
        // userdbIns.addFileWith(dbinstance(), req.body, function(result) {
        //     res.json({ 'result': result });
        // });
        console.log(req.body);

        res.json({"code": "0000", "msg": "success"});

    });
}

module.exports = { editFileEnd, creatorFile, updateFile, getFile, getFilewithID, deleteFile, getOneFolderFiles, getOneuserNewestFiles, editFile , locationTracking};