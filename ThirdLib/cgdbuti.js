/*
 * @Author: your name
 * @Date: 2019-11-29 10:54:54
 * @LastEditTime: 2019-11-29 10:55:11
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /CoperationGroupNodeServer/ThirdLib/cgdbuti.js
 */

// 返回数据库结构体
var getSQLObject = function(){
	return {
		// select/update/delete/insert
		"query": "select",
		// table name
		"tables": "",
		"data":{
			// for select, use ("key": anything)
			// for others, use ("key": value)
		},
		"where": {
			// and / or / not / ""
			"type": "and",
			"condition": []
		},
		// options
		"options": {
			"group by": "",
			"order by": ""
		}
	};
};

var getSQLObject_sv = function(){
	return {
		"sql": "",
		"value": []
	};
};

// 解析数据库结构体
var _structureAnalysis = function(sqlObj) {
	let dataKey = [], dataValue = [];
	let optionKey = [];
	let whereSql = "";
	let hasWhere = false;
	// 读取键值
	for(var key in sqlObj["data"]){
		if(sqlObj["query"] == 'update'){
			dataKey.push([key, "?"].join("="));
		}
		else{
			dataKey.push(key);
		}
		dataValue.push(sqlObj["data"][key]);
	}
	
	// 判断是否有where条件
	hasWhere = sqlObj["where"]["condition"].length == 0? false : true;
	whereSql = "where " + sqlObj["where"]["condition"].join(` ${sqlObj["where"]["type"]} `);
	
	// 读取语句中的可选部分(order by, group by)
	for(var key in sqlObj["options"]){
		if(sqlObj["options"][key] && sqlObj["options"][key] != ""){
			optionKey.push([key, sqlObj["options"][key]].join(" "));
		}
	}
	
	// 组装语句
	let sql = {
		"update" : `update ${sqlObj["tables"]} set ${dataKey.join(",")} ${hasWhere? whereSql : ""};`,
		"select" : `select ${dataKey.join(",")} from ${sqlObj["tables"]} ${hasWhere? whereSql : ""} ${optionKey.join(" ")};`,
		"delete" : `delete from ${sqlObj["tables"]} ${hasWhere? whereSql : ""};`,
		"insert" : `insert into ${sqlObj["tables"]} (${dataKey.join(",")}) values(${dataKey.fill('?').join(",")});`
	}
	
	// 生成SQL结构体
	let result = getSQLObject_sv();
	result["sql"] = sql[sqlObj["query"]];
	result["value"] = sqlObj["query"] == "select"? [] : dataValue;
	//console.log(result);
	return result;
};