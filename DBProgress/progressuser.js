/*
 * @Author: noah shan
 * @Date: 2019-11-29 10:01:42
 * @LastEditTime: 2019-11-29 13:40:37
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
function addUserWith(usermodel, any) {
    var sql = 'insert into users values (\'${usermodel[""]}\', \'\', \'\', \'\')';
    console.log('halo.moto, ${sql}');
}

 module.exports = {getAlluser, getUserWith, addUserWith};