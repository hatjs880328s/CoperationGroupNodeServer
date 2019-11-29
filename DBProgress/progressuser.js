/*
 * @Author: noah shan
 * @Date: 2019-11-29 10:01:42
 * @LastEditTime: 2019-11-29 10:21:12
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

 module.exports = {getAlluser};