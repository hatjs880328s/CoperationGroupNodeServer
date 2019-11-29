/*
 * @Author: your name
 * @Date: 2019-11-29 11:43:21
 * @LastEditTime: 2019-11-29 13:38:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNodeServer/ThirdLib/dbuti.js
 */

const appconfig = require('../Config/config');
var mysql = require('mysql');

var connection = mysql.createConnection({
	    host: 'localhost',
        user: 'root',
        password: appconfig.mysqlpwd,
        database: 'CoperationGroupDB'
});
/*
参数说明：
sql: SQL语句，string类型
args：SQL语句中的参数，Array类型
callback：异步回调函数
*/
function dataBaseControl(sql, args, callback){
    if(args == null || args.length == 0){
        connection.query(sql, function(error, results, fields){
            if(error){
                console.error(error);
                callback(null);
                return;
            }
            callback(results);
        });
    }
    else{
        connection.query(sql, args, function(error, results, fields){
            if(error){
                console.error(error);
                callback(null);
                return;
            }
            callback(results);
        });
    }
}

// sql是语句，args是参数，callback回调函数
function _generalOperation(sql, args, callback) {
	dataBaseControl(sql, args, callback);
};

/*
参数说明：
sqlObj: SQL语句结构体，Object类型
{
    "sql": sql语句,
    "value": sql语句中的参数值
}
return：语句执行结果
*/

// 传入单条SQL语句
var ControlAPI_obj_async = function(data) {
    var sqlObj = _structureAnalysis(data);
    return new Promise((resolved, rejected)=>{
        _generalOperation(sqlObj["sql"], sqlObj["value"], (result)=>{
            if(result === null){
                rejected(null);
            }
            else{
                resolved(result);
            }
        });
    });
}

// 传入多条SQL语句
this.ControlAPI_objs_async = function(...vars) {
    let len = vars.length;
    let promiseList = [];
    for(let i = 0; i < len; i++){
        let sqlObj = _structureAnalysis(vars[i]);
        promiseList.push(new Promise((resolved, rejected)=>{
            _generalOperation(sqlObj["sql"], sqlObj["value"], (result)=>{
                if(result === null){
                    rejected(null);
                }
                else{
                    resolved(result);
                }
            });
        }));
    }
    return Promise.all(promiseList);
}