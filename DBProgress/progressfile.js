/*
 * @Author: your name
 * @Date: 2019-11-30 11:24:12
 * @LastEditTime: 2019-11-30 11:41:12
 * @LastEditors: Please set LastEditors
 * @Description: file 的操作
 * @FilePath: /CoperationGroupNodeServer/DBProgress/progressfile.js
 */


 /// 获取所有用户信息
function getAllFile(connection, any) {
    var sql = 'select * from File';
    connection.query(sql, function(err, result) {
        if (err) {
            any('');
        } else {
            any(result);
        }
    });
}

/// 根据用户id获取用户信息
function getFileWith(connection, fileid, any) {
    var sql = 'select * from File where fileid = \'' + fileid + '\';';
    connection.query(sql, function(err, result) {
        if (err) {
            any('');
        } else {
            any(result);
        }
    });
}

/// 添加一个用户，传入一个user json obj
function addFileWith(connection, filemodel, any) {
    var sql = `insert into File values ` 
    + `(\'${filemodel["userid"]}\', \'${filemodel["nickname"]}\', ` 
    + `\'${filemodel["email"]}\', \'${filemodel["icon"]}\')`;
    connection.query(sql, function(err, result) {
        if (err) {
            any(false);
        } else {
            any(true);
        }
    });
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