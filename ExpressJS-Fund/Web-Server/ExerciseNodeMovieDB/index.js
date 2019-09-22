const http = require('http');
const url = require('url');
const handlers = require('./handlers/index');
const port = 3000;

http.createServer((request, response) => {
    request.path = url.parse(request.url).pathname;

    for (const handler of handlers) {
        if (handler(request, response) === false) {
            break;
        }
    }
})
    .listen(port);