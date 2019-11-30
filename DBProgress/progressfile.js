/*
 * @Author: your name
 * @Date: 2019-11-30 11:24:12
 * @LastEditTime: 2019-11-30 11:25:08
 * @LastEditors: Please set LastEditors
 * @Description: file 的操作
 * @FilePath: /CoperationGroupNodeServer/DBProgress/progressfile.js
 */


 /// 获取所有用户信息
function getAllFile(connection, any) {
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
function getFileWith(connection, uid, any) {
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
function addFileWith(connection, usermodel, any) {
    var sql = `insert into users values ` 
    + `(\'${usermodel["userid"]}\', \'${usermodel["nickname"]}\', ` 
    + `\'${usermodel["email"]}\', \'${usermodel["icon"]}\')`;
    connection.query(sql, function(err, result) {
        if (err) {
            any(false);
        } else {
            any(true);
        }
    });
}

/// 更新用户信息
function updateFileWith(connection, usermodel, any) {
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
function deleteFile(connection, uid, any) {
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