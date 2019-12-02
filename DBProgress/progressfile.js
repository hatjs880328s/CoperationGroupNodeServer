/*
 * @Author: your name
 * @Date: 2019-11-30 11:24:12
 * @LastEditTime: 2019-12-02 16:49:31
 * @LastEditors: Please set LastEditors
 * @Description: file 的操作
 * @FilePath: /CoperationGroupNodeServer/DBProgress/progressfile.js
 */


 /// 获取所有用户信息
async function getAllFile(connection, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
    sqlModel["query"] = "select";
	sqlModel["tables"] = "File";
	sqlModel["data"] = {
		"*":0
	};
    sqlModel['where'] = {'type': 'and', 'condition': []}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    console.log(result);
    any(result);
}

/// 根据文件id获取文件信息
async function getFileWith(connection, fileid, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
    sqlModel["query"] = "select";
	sqlModel["tables"] = "File";
	sqlModel["data"] = {
		"*":0
	};
    sqlModel['where'] = {'type': 'and', 'condition': [`fileid = '${fileid}'`]}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    console.log(result[0]);
    any(result[0]);
}

/// 根据用户id获取用户信息
async function getFilesWithFolderid(connection, folderid, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
    sqlModel["query"] = "select";
	sqlModel["tables"] = "File";
	sqlModel["data"] = {
		"*":0
	};
    sqlModel['where'] = {'type': 'and', 'condition': [`folderid = '${folderid}'`]}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    console.log(result);
    any(result);
}

/// 添加一个文件，传入一个user json obj
async function addFileWith(connection, filemodel, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
    sqlModel['tables'] = 'File';
    sqlModel['query'] = 'insert';
    sqlModel['data'] = 
    {'fileid': filemodel["fileid"],
     'name': filemodel["name"],
     'description': filemodel["description"],
     'content': filemodel["content"],
     'folderid': filemodel["folderid"],
     'createtime': filemodel["createtime"],
     'changetime': filemodel["changetime"],
     'images': filemodel["images"],
     'currentowner': filemodel["currentowner"],
     'creator': filemodel["creator"]
    }
    sqlModel['where'] = {'type': 'and', 'condition': []}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    any(result != null);
}

/// 更新用户信息
async function updateFileWith(connection, filemodel, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
    sqlModel['tables'] = 'File';
    sqlModel['query'] = 'update';
    sqlModel['data'] = 
    {'fileid': filemodel["fileid"],
     'name': filemodel["name"],
     'description': filemodel["description"],
     'content': filemodel["content"],
     'folderid': filemodel["folderid"],
     'createtime': filemodel["createtime"],
     'changetime': filemodel["changetime"],
     'images': filemodel["images"],
     'currentowner': filemodel["currentowner"],
     'creator': filemodel["creator"]
    }
    sqlModel['where'] = {'type': 'and', 'condition': [`fileid = '${filemodel["fileid"]}'`]}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    any(result != null);
}

/// 删除用户信息
async function deleteFile(connection, fileid, any) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
	sqlModel["query"] = "delete";
	sqlModel["tables"] = "File";
    sqlModel['where'] = {'type': 'and', 'condition': [`fileid = '${fileid}'`]}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    any(result != null);
}

 module.exports = {getAllFile, getFileWith, addFileWith, updateFileWith, deleteFile, getFilesWithFolderid};