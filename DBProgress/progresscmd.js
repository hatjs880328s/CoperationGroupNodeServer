/*
 * @Author: NOAH SHAN
 * @Date: 2019-11-30 11:24:12
 * @LastEditTime: 2019-12-02 09:30:22
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
    console.log(result[0]);
    any(result[0]);
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

 module.exports = {getAllCMD, getCMDWith, addCMDWith, updateCMDWith, deleteCMD};