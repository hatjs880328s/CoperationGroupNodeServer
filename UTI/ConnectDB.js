/*
 * @Author: noah shan
 * @Date: 2019-11-28 16:06:10
 * @LastEditTime: 2019-12-17 11:01:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNode/ConnectDB.js
 */



function mysqlconnect() {
    const appconfig = require('../Config/config');
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: appconfig.mysqlpwd,
        database: 'CoperationGroupDB'
    });
    connection.connect();

    connection.on('error', function(err) {
        console.log(`mysql connection error: ${err}`);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('mysql 进行重连操作');
            connection.connect();
        } else {
            throw err;
        }
    });
    return connection;
}

module.exports = {mysqlconnect};