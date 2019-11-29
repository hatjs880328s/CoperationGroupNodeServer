/*
 * @Author: noah shan
 * @Date: 2019-11-28 16:06:10
 * @LastEditTime: 2019-11-29 09:44:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNode/ConnectDB.js
 */

 /// config instance
 const appconfig = require('../Config/config');

 /// mysql instance
 const mysql = require('../UTI/ConnectDB');

 /// api instance
 const app = require('../UTI/ConnectAPI');

 /// db config 
 var dbinstance = mysql.mysqlconnect();

 /// api config
 app.config();
  
  /// get all user infos
 app.apiconfig.get('/users', function(err, res) {
     console.log('have someone request users');
     const sql = 'select * from users;';
     console.log(dbinstance);
     dbinstance.query(sql, function(err, result) {
         if (err) {
             console.log('[SELECT ERROR] - ', err.message);
         } else {
             res.json(result);
         }
     });
 })   
 
 /// 开启监听
 var server = app.apiconfig.listen(8081, appconfig.hostapi, function () {
     var host = server.address().address;
     var port = server.address().port;
     console.log("监听地址为 http://%s:%s", host, port);
 })