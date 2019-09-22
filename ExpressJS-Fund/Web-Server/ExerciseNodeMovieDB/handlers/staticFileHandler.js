const fs = require("fs");

function getContentType(path) {
    if (path.endsWith(".css")) {
        return "text/css";
    } else if (path.endsWith(".ico")) {
        return "image/x-icon";
    } else if (path.endsWith(".png")) {
        return "image/png";
    }
}

module.exports = (request, response) => {
    if (request.path.startsWith("/public") && request.method === "GET") {
        fs.readFile(`./${request.path}`, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            response.writeHead(200, {
                "Content-Type":getContentType(request.path)
            });

            response.write(data);
            response.end();
        });
    } else {
        return true;
    }
};