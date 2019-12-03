/*
 * @Author: NOAH SHAN
 * @Date: 2019-11-30 11:24:12
 * @LastEditTime: 2019-12-03 19:22:26
 * @LastEditors: Please set LastEditors
 * @Description: CMD 的操作
 * @FilePath: /CoperationGroupNodeServer/DBProgress/progresscmd.js
 */


 /// 获取所有用户信息
 async function getAllCMD(connection, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
    sqlModel["query"] = "select";
	sqlModel["tables"] = "CMD";
	sqlModel["data"] = {
		"*":0
	};
    sqlModel['where'] = {'type': 'and', 'condition': []}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    console.log(result);
    any(result);
}

/// 根据用户id获取用户信息
async function getCMDWith(connection, fileid, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
    sqlModel["query"] = "select";
	sqlModel["tables"] = "CMD";
	sqlModel["data"] = {
		"*":0
	};
    sqlModel['where'] = {'type': 'and', 'condition': [`reveiver = '${fileid}'`]}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    console.log(result);
    any(result);
}

/// 添加一个文件，传入一个user json obj
async function addCMDWith(connection, filemodel, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
    sqlModel['tables'] = 'CMD';
    sqlModel['query'] = 'insert';
    sqlModel['data'] = 
    {'cmdid': filemodel["cmdid"],
     'sender': filemodel["sender"],
     'reveiver': filemodel["reveiver"],
     'cmdtype': filemodel["cmdtype"],
     'time': filemodel["time"],
     'groupid': filemodel["groupid"]
    }
    sqlModel['where'] = {'type': 'and', 'condition': []}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    any(result != null);
}

/// 更新用户信息
async function updateCMDWith(connection, filemodel, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
    sqlModel['tables'] = 'CMD';
    sqlModel['query'] = 'update';
    sqlModel['data'] = 
    {'cmdid': filemodel["cmdid"],
     'sender': filemodel["sender"],
     'reveiver': filemodel["reveiver"],
     'cmdtype': filemodel["cmdtype"],
     'time': filemodel["time"],
     'groupid': filemodel["groupid"]
    }
    sqlModel['where'] = {'type': 'and', 'condition': [`cmdid = '${filemodel["cmdid"]}'`]}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    any(result != null);
}

/// 删除用户信息
async function deleteCMD(connection, fileid, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
	sqlModel["query"] = "delete";
	sqlModel["tables"] = "CMD";
    sqlModel['where'] = {'type': 'and', 'condition': [`cmdid = '${fileid}'`]}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    any(result != null);
}

/// 指令操作 - 同意还是拒绝邀请
async function progressCMD(connection, oldCMDid, filemodel, callBack) {
    var dbuti = require('../ThirdLib/cgdbuti');
    //1.delete sql
    var deleteSql = `delete from CMD where cmdid = '${oldCMDid}'`;
    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    console.log(deleteSql);
    console.log(filemodel);
    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    //2.添加一个新指令
    var newSql = `insert into CMD values ('${filemodel["cmdid"]}', '${filemodel["sender"]}', '${filemodel["reveiver"]}', ${filemodel["cmdtype"]}, '${filemodel["time"]}', '${filemodel["groupid"]}')`;
    // 3.执行transcation
    dbuti.execTrans(connection, [deleteSql, newSql], function(err, info) {
        callBack(err, info);
    })
}


 module.exports = {getAllCMD, getCMDWith, addCMDWith, updateCMDWith, deleteCMD, progressCMD};