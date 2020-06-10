/*
 * @Author: noah shan
 * @Date: 2019-11-28 16:06:10
 * @LastEditTime: 2020-06-09 09:59:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNode/ConnectDB.js
 */

const mysql = require('mysql');
const appconfig = require('../Config/config');

/// 获取一个连接
function handleDisconnection() {
    let connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: appconfig.mysqlpwd,
        database: 'CoperationGroupDB'
    })
    connection.connect(function (err) {
        if (err) {
            console.log(`db error connect: ${err}`);
            setTimeout(handleDisconnection, 2000);
        }
    });

    connection.on('error', function (err) {
        console.log(`db error: ${err}`);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log(`db error执行重连: ${err.message}`);
            handleDisconnection();
        } else {
            throw err;
        }
    });

    return connection;
}

exports.handleDisconnection = handleDisconnection;