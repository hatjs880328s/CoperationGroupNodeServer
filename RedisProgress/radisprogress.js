/*
 * @Author: your name
 * @Date: 2019-12-04 13:35:12
 * @LastEditTime: 2019-12-04 14:12:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNodeServer/RedisProgress/radisprogress.js
 */

/// 存储一个key [key: fileid, value: userid]
/// 在redis中存储一条记录；记录某一个文件是否被某人编辑
function saveKey(db, key, value) {
    // var redisDb = require('../UTI/ConnectRedis');
    // var db = redisDb.redisConfig();
    db.set(key, value);
}

/// 获取一个key,如果不存在返回false
function getKey(db, key, result) {
    // var redisDb = require('../UTI/ConnectRedis');
    // var db = redisDb.redisConfig();
    db.get(key, function (err, value) {
        if (err) {
            result(false, null);
        } else {
            //取值成功，返回指定键值对应的value,若键值不存在，返回null
            console.log(`redis - key: ${key} ; value: ${value}`);
            if (value == null) {
                result(false, null);
            }
            result(true, value);
        }
    })
}

/// 删除一个key,如果不存在返回false
function deleteKey(db, key, resultaction) {
    // var redisDb = require('../UTI/ConnectRedis');
    // var db = redisDb.redisConfig();
    db.del(key, function(err, value) {
        //删除成功，返回1，否则返回0(对于不存在的键进行删除操作，同样返回0)
        if (err) {
            resultaction(false);
        } else {
            if (value = 0) {
                resultaction(false);
            } else {
                resultaction(true);
            }
        }
    })
}

module.exports = {deleteKey, getKey, saveKey};