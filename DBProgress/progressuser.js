/*
 * @Author: noah shan
 * @Date: 2019-11-29 10:01:42
 * @LastEditTime: 2019-11-30 10:54:03
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
    });
}

/// 添加一个用户，传入一个user json obj
function addUserWith(connection, usermodel, any) {
    var sql = `insert into users values ` 
    + `(\'${usermodel["userid"]}\', \'${usermodel["nickname"]}\', \'${usermodel["email"]}\', \'${usermodel["icon"]}\')`;
    connection.query(sql, function(err, result) {
        if (err) {
            any(false);
        } else {
            any(true);
        }
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
    });
}

/// 删除用户信息
function deleteUser(connection, uid, any) {
    var sql = `delete users where userid = '${uid}';`;
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            any(false);
        } else {
            any(true);
        }
    });
}

 module.exports = {getAlluser, getUserWith, addUserWith, updateUserWith, deleteUser};