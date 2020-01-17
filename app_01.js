const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = reg.method;
    console.log(`http request received: url=${url}, method=${method}`);
});
server.listen(8080);
