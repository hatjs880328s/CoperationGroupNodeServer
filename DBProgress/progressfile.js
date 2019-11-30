/*
 * @Author: your name
 * @Date: 2019-11-30 11:24:12
 * @LastEditTime: 2019-11-30 14:45:27
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

/// 根据用户id获取用户信息
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
function updateFileWith(connection, filemodel, any) {
    var sql = `update File set nickname ` 
    + `= '${filemodel["nickname"]}', email = '${filemodel["email"]}', ` 
    + `icon = '${filemodel["icon"]}' where userid = '${filemodel["userid"]}';`;
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            any(false);
        } else {
            any(true);
        }
    });
}

/// 删除用户信息
function deleteFile(connection, fileid, any) {
    var sql = `delete from File where fileid = '${fileid}';`;
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            any(false);
        } else {
            any(true);
        }
    });
}

 module.exports = {getAllFile, getFileWith, addFileWith, updateFileWith, deleteFile};