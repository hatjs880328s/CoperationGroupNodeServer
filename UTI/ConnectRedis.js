/*
 * @Author: your name
 * @Date: 2019-12-04 13:37:16
 * @LastEditTime: 2019-12-04 13:52:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNodeServer/UTI/ConnectRedis.js
 */

/// redis初始化
function redisConfig() {
    var redis = require('redis')
    var client = redis.createClient(6379, '127.0.0.1')
    client.on('error', function (err) {
        console.log('Redis start Error, 请检测是否开启 Error: ' + err);
    });
    return client;
}

module.exports = {redisConfig};