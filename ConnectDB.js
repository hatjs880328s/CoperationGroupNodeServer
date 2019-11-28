/*
 * @Author: noah shan
 * @Date: 2019-11-28 16:06:10
 * @LastEditTime: 2019-11-28 19:50:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNode/ConnectDB.js
 */



function mysqlconnect() {
    const appconfig = require('./config');
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: appconfig.mysqlpwd,
        database: 'CoperationGroupDB'
    });
    connection.connect();
    return connection;
}

module.exports = {mysqlconnect};