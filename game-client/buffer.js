var i = new Buffer(4);
i.fill(71, 3, 4);
var str = new Buffer('{"clientId":"001","password":"robin","type":"LOGIN","username":"robin"}');
var b1 = Buffer.concat([i, str]);

console.log(b1);