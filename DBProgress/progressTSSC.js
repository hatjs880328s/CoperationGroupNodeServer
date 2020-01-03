/*
 * @Author: your name
 * @Date: 2019-12-31 09:17:22
 * @LastEditTime : 2020-01-03 17:16:07
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNodeServer/DBProgress/progressTSSC.js
 */

/// 唐诗宋词 db progress

/// 将一个文件中的数据进行遍历，然后插入
async function addTSSCWith(connection, bodyinfo, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqls = [];
    var filemodel = bodyinfo["infos"];
    for (var i = 0 ; i < filemodel.length ; i++) {
        var delSQL = `delete from TSSC where id = '${filemodel[i]['id']}'`;
        var eachSQL = `insert into TSSC values ('${filemodel[i]['id']}', '${filemodel[i]['title']}', '${filemodel[i]['author']}', '${filemodel[i]['paragraphs']}');`;
        sqls.push(delSQL);
        sqls.push(eachSQL);
    }
    // a.执行transcation
    dbuti.execTrans(connection, sqls, function(err, info) {
        if (err == null) {
            any(true);
        } else {
            any(false);
        }
    })
}

/// 将一个文件中的数据进行遍历，然后插入
async function addTSSCAuthorWith(connection, bodyinfo, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqls = [];
    var filemodel = bodyinfo["infos"];
    for (var i = 0 ; i < filemodel.length ; i++) {
        var delSQL = `delete from TSSCAUTHOR where id = '${filemodel[i]['id']}'`;
        var eachSQL = `insert into TSSCAUTHOR values ('${filemodel[i]['id']}', '${filemodel[i]['name']}', '${filemodel[i]['desc']}');`;
        sqls.push(delSQL);
        sqls.push(eachSQL);
    }
    // a.执行transcation
    dbuti.execTrans(connection, sqls, function(err, info) {
        if (err == null) {
            any(true);
        } else {
            any(false);
        }
    })
}

/// 将一个文件中的数据进行遍历，然后插入
async function addSCWith(connection, bodyinfo, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqls = [];
    var filemodel = bodyinfo["infos"];
    for (var i = 0 ; i < filemodel.length ; i++) {
        var delSQL = `delete from SC where id = '${filemodel[i]['id']}'`;
        var eachSQL = `insert into SC values ('${filemodel[i]['id']}', '${filemodel[i]['title']}', '${filemodel[i]['author']}', '${filemodel[i]['paragraphs']}');`;
        sqls.push(delSQL);
        sqls.push(eachSQL);
    }
    // a.执行transcation
    dbuti.execTrans(connection, sqls, function(err, info) {
        if (err == null) {
            any(true);
        } else {
            any(false);
        }
    })
}

/// 将一个文件中的数据进行遍历，然后插入
async function addSCAuthorWith(connection, bodyinfo, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqls = [];
    var filemodel = bodyinfo["infos"];
    for (var i = 0 ; i < filemodel.length ; i++) {
        var delSQL = `delete from SCAUTHOR where id = '${filemodel[i]['id']}'`;
        var eachSQL = `insert into SCAUTHOR values ('${filemodel[i]['id']}', '${filemodel[i]['name']}', '${filemodel[i]['desc']}');`;
        sqls.push(delSQL);
        sqls.push(eachSQL);
    }
    // a.执行transcation
    dbuti.execTrans(connection, sqls, function(err, info) {
        if (err == null) {
            any(true);
        } else {
            any(false);
        }
    })
}

module.exports = { addTSSCWith, addTSSCAuthorWith, addSCWith, addSCAuthorWith };