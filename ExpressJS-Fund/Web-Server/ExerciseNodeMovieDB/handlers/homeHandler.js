const fs = require('fs');

module.exports = (request, response) => {
    if (request.path.startsWith('/') && request.method === 'GET') {
        fs.readFile('./views/home.html', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            response.writeHead(200, {
                "Content-Type": "text/html"
            });

            response.write(data);
            response.end();
        })
    } else {
        return true;
    }
};