var net = require('net');
var client = new net.Socket();
var port = 9090;
var host = "localhost";
var deskId = "12345";

client.setEncoding("utf8");
client.connect(port, host, function(){
	//模拟发送登录请求
	sendLoginInfo();
});

client.on('data', function(data) {
	console.log(data);
	var buffer = new Buffer(data);
	var json = buffer.toString("utf-8", 4, buffer.length);
	var obj = JSON.parse(json);
	console.log(obj);
	if(obj.t == "LOGINRES") {
		console.log(obj.message);
		console.log("开始加入游戏房间");
		//创建游戏房间
		sendCreateMj(obj.uid);
		//加入游戏房间
		sendJoinMj(obj.uid, deskId);		
	} else if(obj.t == "MJ_CREATERES"){
		console.log('创建房间号:[' + obj.deskId + ']');
	} else if(obj.t == "MJ_JOINRES") {
		if(obj.status == "SUCCESS") {
			console.log('加入房间号:[' + obj.deskId + ']成功!');
		} else {
			console.log('加入房间号:[' + obj.deskId + ']失败!');
		}
	} else if(obj.t == "MJ_START") {
		
	} else if(obj.t == "MJ_HU") {
		
	} else if(obj.t == "MJ_PENG") {
		
	} else if(obj.t == "MJ_GANG") {
		
	} else if(obj.t == "MJ_GUO") {
		
	} else if(obj.t == "MJ_GET") {
		
	} else if(obj.t == "MJ_END_EMPTY" {
		
	} else if(obj.t == "MJ_END") {
		
	}
});

client.on('close', function(){
	console.log('Connection closed');
});

var sendLoginInfo = function() {
	var info = '{"t": "LOGIN", "username": "robin", "password": "robin"}';
	sendToAgentServerInfo(info);
}

var sendCreateMj = function(uid) {
	var info = '{"t": "MJ_CREATE", "gid": "1000", "uid": "' + uid + '"}';
	sendToAgentServerInfo(info);
}

var sendJoinMj = function(uid, deskId) {
	var info = '{"t": "MJ_JOIN", "gid": "1000", "uid": "' + uid + '", "deskId": "' + deskId + '"}';
	sendToAgentServerInfo(info);
}

var sendToAgentServerInfo = function(info) {
	var count = new Buffer(4);	
	var str = new Buffer(info);
	count.fill(0, 0);
	count.fill(str.length, 3, 4);
	
	var byteInfo = Buffer.concat([count, str]);
	
	console.log(byteInfo);
	console.log(byteInfo.toString("utf-8", 4, byteInfo.length));
	client.write(byteInfo);
}