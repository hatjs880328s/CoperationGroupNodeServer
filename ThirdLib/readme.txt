//查找
async function(){
	let stru = getSQLObject();
	stru["query"] = "select";
	stru["tables"] = "userDuty";
	stru["data"] = {
		"status" : 0,
		"count(*)":0
	};
	stru["where"]["condition"] = [
		"uid = " + uid,
	];
	stru["options"]["group by"] = "status";
	let result = await ControlAPI_obj_async(stru);
	return result;
}

//插入
async function(){
	let stru = getSQLObject();
	stru["query"] = "insert";
	stru["tables"] = "surveyCollection";
	stru["data"] = {
		"did" : req.body.did,
		"uid" : req.session.user.uid,
		"scontent": req.body.answer
	};
	await ControlAPI_obj_async(stru);
}

//更新
async function(){
	let strc = getSQLObject();
	strc["query"] = 'update';
	strc["tables"] = "userInfo";
	strc["data"] = {
		"umoney" : amount
	};
	strc["where"]["condition"] = [
		"uid  = " + user
	];
	await ControlAPI_obj_async(strc);
}

//delete
async function(){
	let stru0 = getSQLObject();
	// 从兴趣组中移除
	stru0["query"] = "delete";
	stru0["tables"] = "userGroup";
	stru0["where"]["condition"] = [
	    'gid = ' + gid,
	    'uid = ' + id
	];
	await ControlAPI_obj_async(stru0);
}