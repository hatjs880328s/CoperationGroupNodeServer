/*
 * @Author: noah shan
 * @Date: 2019-11-28 16:06:10
 * @LastEditTime: 2020-06-04 16:42:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNode/ConnectDB.js
 */



// function mysqlconnect() {
//     const appconfig = require('../Config/config');
//     const mysql = require('mysql');
//     const connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: appconfig.mysqlpwd,
//         database: 'CoperationGroupDB'
//     });
//     connection.connect();

//     connection.on('error', function(err) {
//         console.log(`mysql connection error: ${err}`);
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.log('mysql 进行重连操作');
//             connection.connect();
//         } else {
//             console.log(`others mysql error: ${err}`);
//             throw err;
//         }
//     });
//     return connection;
// }

    const appconfig = require('../Config/config');
    const mysql = require('mysql');
    var mysql_config = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: appconfig.mysqlpwd,
        database: 'CoperationGroupDB'
    };
    function handleDisconnection() {
        var connection = mysql.createConnection(mysql_config);
         connection.connect(function(err) {
             if(err) {
                 setTimeout('handleDisconnection()', 2000);
             }
         });
     
         connection.on('error', function(err) {
             logger.error('db error', err);
             if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                 logger.error('db error执行重连:'+err.message);
                 handleDisconnection();
             } else {
                 throw err;
             }
         });
         exports.connection = connection;
    }
     
    exports.handleDisconnection = handleDisconnection;