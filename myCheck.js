var http = require('http');
var data = {
    show:true
};
http.createServer(function (request, response) {

    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'application/json'});

    // 发送响应数据 "Hello World"
    response.end(JSON.stringify(data));
}).listen(8001);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8001/');