/*
 * @Author: your name
 * @Date: 2019-11-28 19:34:10
 * @LastEditTime: 2019-11-28 19:42:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNode/ConnectAPI.js
 */

const express = require('express');

const apiconfig = express();

function config() {
    // 下面是解决跨域请求问题
    apiconfig.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
     });
}

 module.exports = {apiconfig, config};