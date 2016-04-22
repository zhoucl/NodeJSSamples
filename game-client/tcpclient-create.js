var net = require('net');
var client = new net.Socket();
var port = 9090;
var host = "localhost";

client.setEncoding("utf8");
client.connect(port, host, function(){
	//模拟发送登录请求
	sendLoginInfo();
	//sendCreateMj(7652);
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
		//sendJoinMj(obj.uid, 9898);
	} else if(obj.t == "CREATEROOMRES"){
		console.log('创建房间号:[' + obj.roomNo + ']');
	} else if(obj.t == "JOINROOMRES") {
		if(obj.status == "SUCCESS") {
			console.log('加入房间号:[' + obj.roomNo + ']成功!');
		} else {
			console.log('加入房间号:[' + obj.roomNo + ']失败!');
		}
	}
});

client.on('close', function(){
	console.log('Connection closed');
});

var sendLoginInfo = function() {
	var info = '{"t": "LOGIN", "username": "user2", "password": "user2"}';
	sendToAgentServerInfo(info);
}

var sendCreateMj = function(uid) {
	var info = '{"t": "CREATEROOM", "gid": "1000", "uid": "' + uid + '"}';
	sendToAgentServerInfo(info);
}

var sendJoinMj = function(uid, roomNo) {
	var info = '{"t": "JOINROOM", "gid": "1000", "uid": "' + uid + '", "roomNo": "' + roomNo + '"}';
	sendToAgentServerInfo(info);
}

var sendToAgentServerInfo = function(info) {
	var count = new Buffer(4);	
	var str = new Buffer(info);
	count.fill(0, 0);
	count.fill(str.length, 3, 4);
	
	var byteInfo = Buffer.concat([count, str]);
	
	//console.log(byteInfo);
	console.log("请求数据:" + byteInfo.toString("utf-8", 4, byteInfo.length));
	client.write(byteInfo);
}