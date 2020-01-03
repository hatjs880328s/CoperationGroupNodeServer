/*
 * @Author: your name
 * @Date: 2019-12-30 16:29:32
 * @LastEditTime : 2020-01-03 09:32:38
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNodeServer/APIProgress/apiTSSCprogress.js
 */

/// 唐诗宋词数据接收处理

/// tssc
function syncTSSCInfos(app, TSSCDBIns, dbinstance) {
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.json({ extended: false })
    app.apiconfig.post('/tssc/sync', urlencodedParser, function (req, res) {
        console.log('sync TSSC detail infos.');
        TSSCDBIns.addTSSCWith(dbinstance, req.body, function(result) {
            res.json({ 'result': result });
        });
    });
}

/// tssc author
function syncTSSCAuthorsInfo(app, TSSCDBIns, dbinstance) {
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.json({ extended: false })
    app.apiconfig.post('/tsscauthor/sync', urlencodedParser, function (req, res) {
        console.log('sync TSSC author detail infos.');
        TSSCDBIns.addTSSCAuthorWith(dbinstance, req.body, function(result) {
            res.json({ 'result': result });
        });
    });
}


module.exports = { syncTSSCInfos, syncTSSCAuthorsInfo };