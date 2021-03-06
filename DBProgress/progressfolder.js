/*
 * @Author: your name
 * @Date: 2019-11-30 15:07:51
 * @LastEditTime: 2019-12-04 08:46:23
 * @LastEditors: Please set LastEditors
 * @Description: 文件夹的db操作
 * @FilePath: /CoperationGroupNodeServer/DBProgress/progressfolder.js
 */
 /// 获取所有用户信息
 async function getAllFolder(connection, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
    sqlModel["query"] = "select";
	sqlModel["tables"] = "Folders";
	sqlModel["data"] = {
		"*":0
	};
    sqlModel['where'] = {'type': 'and', 'condition': []}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    console.log(result);
    any(result);
}

/// 根据用户id获取用户信息
async function getFolderWith(connection, fileid, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
    sqlModel["query"] = "select";
	sqlModel["tables"] = "Folders";
	sqlModel["data"] = {
		"*":0
	};
    sqlModel['where'] = {'type': 'and', 'condition': [`folderid = '${fileid}'`]}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    console.log(result[0]);
    any(result[0]);
    return result[0];
}

/// 根据type uid获取此用户的某一类文件夹
async function getFoldersWith(connection, fileid, type, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
    sqlModel["query"] = "select";
	sqlModel["tables"] = "Folders";
	sqlModel["data"] = {
		"*":0
    };
    // select * from Folders where type = 0 and users like '%c7f2519b-f66e-493b-af5a-fdcc990e77ad%';
    sqlModel['where'] = {'type': 'and', 'condition': [`type = '${type}'`, `users like '%${fileid}%'`]}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    console.log(result);
    any(result);
}

/// 添加一个文件，传入一个user json obj
async function addFolderWith(connection, filemodel, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
    sqlModel['tables'] = 'Folders';
    sqlModel['query'] = 'insert';
    sqlModel['data'] = 
    {'folderid': filemodel["folderid"],
     'name': filemodel["name"],
     'description': filemodel["description"],
     'content': filemodel["content"],
     'createtime': filemodel["createtime"],
     'changetime': filemodel["changetime"],
     'users': filemodel["users"],
     'type': filemodel["type"]
    }
    sqlModel['where'] = {'type': 'and', 'condition': []}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    any(result != null);
}

/// 更新用户信息
async function updateFolderWith(connection, filemodel, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
    sqlModel['tables'] = 'Folders';
    sqlModel['query'] = 'update';
    sqlModel['data'] = 
    {'folderid': filemodel["folderid"],
     'name': filemodel["name"],
     'description': filemodel["description"],
     'content': filemodel["content"],
     'createtime': filemodel["createtime"],
     'changetime': filemodel["changetime"],
     'users': filemodel["users"],
     'type': filemodel["type"]
    }
    sqlModel['where'] = {'type': 'and', 'condition': [`folderid = '${filemodel["folderid"]}'`]}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    any(result != null);
    return result != null;
}

/// 删除用户信息
async function deleteFolder(connection, fileid, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
	sqlModel["query"] = "delete";
	sqlModel["tables"] = "Folders";
    sqlModel['where'] = {'type': 'and', 'condition': [`folderid = '${fileid}'`]}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    any(result != null);
}

 module.exports = {getAllFolder, getFolderWith, addFolderWith, updateFolderWith, deleteFolder, getFoldersWith};