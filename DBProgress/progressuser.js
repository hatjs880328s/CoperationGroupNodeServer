/*
 * @Author: noah shan
 * @Date: 2019-11-29 10:01:42
 * @LastEditTime: 2020-06-09 09:44:46
 * @LastEditors: Please set LastEditors
 * @Description: 处理user表所有操作
 * @FilePath: /CoperationGroupNodeServer/DBProgress/progressuser.js
 */

 /// 获取所有用户信息
function getAlluser(connection, any) {
    var sql = 'select * from users';
    connection.query(sql, function(err, result) {
        if (err) {
            any('');
        } else {
            any(result);
        }
        connection.destroy();
    });
}

/// 根据用户id获取用户信息
function getUserWith(connection, uid, any) {
    var sql = 'select * from users where userid = \'' + uid + '\';';
    connection.query(sql, function(err, result) {
        if (err) {
            any('');
        } else {
            any(result);
        }
        connection.destroy();
    });
}

/// 根据userid获取所有的user信息  userids:   aaaa,bbb,ccc
/// // select * from users where userid in ('6c0f8dce9b062a9123e5b920f0154a24', 'caff566ebcf6ba6feb6e794bce436c63');
async function getUsersWith(connection, userids) {
    var dbuti = require('../ThirdLib/cgdbuti');
    var sqlModel = dbuti.getSQLObject;
    sqlModel["query"] = "select";
	sqlModel["tables"] = "users";
	sqlModel["data"] = {
		"*":0
	};
    var useridList = userids.split(',');
    var realUserids = '';
    for (i = 0 ; i < useridList.length ; i++) {
        if (useridList[i] == '') { continue; }
        if (i == useridList.length - 1) {
            realUserids += `'${useridList[i]}'`
        } else {
            realUserids += `'${useridList[i]}',`
        }
    }
    sqlModel['where'] = {'type': 'and', 'condition': [`userid in (${realUserids})`]}
    var result = await dbuti.ControlAPI_obj_async(sqlModel, connection);
    return result;
}

/// 添加一个用户，传入一个user json obj
function addUserWith(connection, usermodel, any) {
    var sql = `insert into users values ` 
    + `(\'${usermodel["userid"]}\', \'${usermodel["nickname"]}\', ` 
    + `\'${usermodel["email"]}\', \'${usermodel["icon"]}\')`;
    connection.query(sql, function(err, result) {
        if (err) {
            any(false);
        } else {
            any(true);
        }
        connection.destroy();
    });
}

/// 更新用户信息
function updateUserWith(connection, usermodel, any) {
    var sql = `update users set nickname ` 
    + `= '${usermodel["nickname"]}', email = '${usermodel["email"]}', ` 
    + `icon = '${usermodel["icon"]}' where userid = '${usermodel["userid"]}';`;
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            any(false);
        } else {
            any(true);
        }
        connection.destroy();
    });
}

/// 删除用户信息
function deleteUser(connection, uid, any) {
    var sql = `delete from users where userid = '${uid}';`;
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            any(false);
        } else {
            any(true);
        }
        connection.destroy();
    });
}

 module.exports = {getAlluser, getUserWith, addUserWith, updateUserWith, deleteUser, getUsersWith};