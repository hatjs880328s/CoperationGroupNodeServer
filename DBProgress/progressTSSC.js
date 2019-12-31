/*
 * @Author: your name
 * @Date: 2019-12-31 09:17:22
 * @LastEditTime : 2019-12-31 09:35:41
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNodeServer/DBProgress/progressTSSC.js
 */

/// 唐诗宋词 db progress

/// 将一个文件中的数据进行遍历，然后插入
async function addTSSCWith(connection, filemodel, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    // var sqlModel = dbuti.getSQLObject;
    // sqlModel['tables'] = 'TSSC';
    // sqlModel['query'] = 'insert';
    // sqlModel['data'] = 
    // {'folderid': filemodel["folderid"],
    //  'name': filemodel["name"],
    //  'description': filemodel["description"],
    //  'content': filemodel["content"],
    //  'createtime': filemodel["createtime"],
    //  'changetime': filemodel["changetime"],
    //  'users': filemodel["users"],
    //  'type': filemodel["type"]
    // }
    // sqlModel['where'] = {'type': 'and', 'condition': []}
    // var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    // any(result != null);

    var sqls = [];
    for (var i = 0 ; i < filemodel.length ; i++) {
        var delSQL = `delete from TSSC where id = '${filemodel[i]['id']}'`;
        var eachSQL = `insert into TSSC values ('${filemodel[i]['id']}', '${filemodel[i]['title']}', '${filemodel[i]['author']}', '${filemodel[i]['paragraphs']}');`;
        sqls.add(delSQL);
        sqls.add(eachSQL);
    }
    // a.执行transcation
    dbuti.execTrans(connection, sqls, function(err, info) {
        callBack(err, info);
    })
}

module.exports = { addTSSCWith };