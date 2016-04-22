var util = require('./util');
var net = require('net');
var client = new net.Socket();
var client1 = new net.Socket();
var client2 = new net.Socket();
var client3 = new net.Socket();

var roomNo = 0;
var gid = 1000;

var port = 9090;
var host = "localhost";

/////////////////////////////////////////////////////////////////////
client.setEncoding("utf8");
client.connect(port, host, function(){
	//TCP连接后立即发送登录
	sendLoginInfo();
});

client.on('data', function(data) {
	console.log(data);
	var buffer = new Buffer(data);
	var json = buffer.toString("utf-8", 4, buffer.length);
	var obj = JSON.parse(json);
	if(obj.t == "LOGINRES") {
		console.log("[" + obj.uid + "]登录成功,开始创建游戏房间");
		//创建游戏房间
		sendCreateMj(obj.uid);
	} else if(obj.t == "CREATEROOMRES"){
		roomNo = obj.roomNo;
		console.log('创建房间号:[' + obj.roomNo + ']成功');
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

/////////////////////////////////////////////////////////////////////
client1.setEncoding("utf8");
client1.connect(port, host, function(){
	//TCP连接后立即发送登录
	sendLoginInfo1();
});

client1.on('data', function(data) {
	console.log(data);
	var buffer = new Buffer(data);
	var json = buffer.toString("utf-8", 4, buffer.length);
	var obj = JSON.parse(json);
	if(obj.t == "LOGINRES") {
		console.log("[" + obj.uid + "]登录成功,开始加入游戏房间:[" + roomNo + "]");
		if(roomNo == 0)
			setTimeout(sendJoinMj1, 1400, obj.uid);
	} else if(obj.t == "JOINROOMRES") {
		if(obj.status == 1) {
			console.log('加入房间号:[' + obj.roomNo + ']成功!');
		} else {
			console.log('加入房间号:[' + obj.roomNo + ']失败!');
		}
	}
});

client1.on('close', function(){
	console.log('Connection closed');
});

/////////////////////////////////////////////////////////////////////
client2.setEncoding("utf8");
client2.connect(port, host, function(){
	//TCP连接后立即发送登录
	sendLoginInfo2();
});

client2.on('data', function(data) {
	console.log(data);
	var buffer = new Buffer(data);
	var json = buffer.toString("utf-8", 4, buffer.length);
	var obj = JSON.parse(json);
	if(obj.t == "LOGINRES") {
		console.log("[" + obj.uid + "]登录成功,开始加入游戏房间:[" + roomNo + "]");
		if(roomNo == 0)
			setTimeout(sendJoinMj2, 1200, obj.uid);
	} else if(obj.t == "JOINROOMRES") {
		if(obj.status == 1) {
			console.log('加入房间号:[' + obj.roomNo + ']成功!');
		} else {
			console.log('加入房间号:[' + obj.roomNo + ']失败!');
		}
	}
});

client2.on('close', function(){
	console.log('Connection closed');
});

/////////////////////////////////////////////////////////////////////
client3.setEncoding("utf8");
client3.connect(port, host, function(){
	//TCP连接后立即发送登录
	sendLoginInfo3();
});

client3.on('data', function(data) {
	console.log(data);
	var buffer = new Buffer(data);
	var json = buffer.toString("utf-8", 4, buffer.length);
	var obj = JSON.parse(json);
	if(obj.t == "LOGINRES") {
		console.log("[" + obj.uid + "]登录成功,开始加入游戏房间:[" + roomNo + "]");
		if(roomNo == 0) {
			setTimeout(sendJoinMj3, 1000, obj.uid);
		}
	} else if(obj.t == "JOINROOMRES") {
		if(obj.status == 1) {
			console.log('加入房间号:[' + obj.roomNo + ']成功!');
		} else {
			console.log('加入房间号:[' + obj.roomNo + ']失败!');
		}
	}
});

client3.on('close', function(){
	console.log('Connection closed');
});

/////////////////////////////////////////////////////////////////////
var sendLoginInfo = function() {
	var username = util.randomWord(false, 6);
	var info = '{"t": "LOGIN", "username": "' + username + '", "password": "user2"}';
	sendToAgentServerInfo(info);
}

var sendLoginInfo1 = function() {
	var username = util.randomWord(false, 6);
	var info = '{"t": "LOGIN", "username": "' + username + '", "password": "user2"}';
	sendToAgentServerInfo1(info);
}

var sendLoginInfo2 = function() {
	var username = util.randomWord(false, 6);
	var info = '{"t": "LOGIN", "username": "' + username + '", "password": "user2"}';
	sendToAgentServerInfo2(info);
}

var sendLoginInfo3 = function() {
	var username = util.randomWord(false, 6);
	var info = '{"t": "LOGIN", "username": "' + username + '", "password": "user2"}';
	sendToAgentServerInfo3(info);
}

var sendCreateMj = function(uid) {
	var info = '{"t": "CREATEROOM", "gid": "' + gid + '", "uid": "' + uid + '"}';
	sendToAgentServerInfo(info);
}

var sendJoinMj1 = function(uid) {
	var info = '{"t": "JOINROOM", "gid": "' + gid + '", "uid": "' + uid + '", "roomNo": "' + roomNo + '"}';
	sendToAgentServerInfo1(info);
}

var sendJoinMj2 = function(uid) {
	var info = '{"t": "JOINROOM", "gid": "' + gid + '", "uid": "' + uid + '", "roomNo": "' + roomNo + '"}';
	sendToAgentServerInfo2(info);
}

var sendJoinMj3 = function(uid) {
	var info = '{"t": "JOINROOM", "gid": "' + gid + '", "uid": "' + uid + '", "roomNo": "' + roomNo + '"}';
	sendToAgentServerInfo3(info);
}

var sendToAgentServerInfo = function(info) {
	var count = new Buffer(4);	
	var str = new Buffer(info);
	count.fill(0, 0);
	count.fill(str.length, 3, 4);
	
	var byteInfo = Buffer.concat([count, str]);
	
	console.log("请求数据:" + byteInfo.toString("utf-8", 4, byteInfo.length));
	client.write(byteInfo);
}

var sendToAgentServerInfo1 = function(info) {
	var count = new Buffer(4);	
	var str = new Buffer(info);
	count.fill(0, 0);
	count.fill(str.length, 3, 4);
	
	var byteInfo = Buffer.concat([count, str]);
	
	console.log("请求数据:" + byteInfo.toString("utf-8", 4, byteInfo.length));
	client1.write(byteInfo);
}

var sendToAgentServerInfo2 = function(info) {
	var count = new Buffer(4);	
	var str = new Buffer(info);
	count.fill(0, 0);
	count.fill(str.length, 3, 4);
	
	var byteInfo = Buffer.concat([count, str]);
	
	console.log("请求数据:" + byteInfo.toString("utf-8", 4, byteInfo.length));
	client2.write(byteInfo);
}

var sendToAgentServerInfo3 = function(info) {
	var count = new Buffer(4);	
	var str = new Buffer(info);
	count.fill(0, 0);
	count.fill(str.length, 3, 4);
	
	var byteInfo = Buffer.concat([count, str]);
	
	console.log("请求数据:" + byteInfo.toString("utf-8", 4, byteInfo.length));
	client3.write(byteInfo);
}