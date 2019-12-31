/*
 * @Author: your name
 * @Date: 2019-12-30 16:29:32
 * @LastEditTime : 2019-12-31 09:11:35
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNodeServer/APIProgress/apiTSSCprogress.js
 */

/// 唐诗宋词数据接收处理

/// 创建file信息
function syncTSSCInfos(app, FolderdbIns, dbinstance) {
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.apiconfig.post('/tssc/sync', urlencodedParser, function (req, res) {
        console.log('sync TSSC detail infos.');
        FolderdbIns.addFolderWith(dbinstance, req.body, function (result) {
            res.json({ 'result': result });
        });
    });
}


module.exports = { syncTSSCInfos };