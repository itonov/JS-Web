const db = require("../config/dataBase");
const fs = require("fs");
const qs = require("querystring");

// function readHtml(resp, replacementHtml) {
//     fs.readFile()
// }

module.exports = (request, response) => {
    if (request.path === '/viewAllMovies' && request.method === 'GET') {
        fs.readFile('./views/viewAllHtml', ((err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            let allMoviesHtml = '';

            for (const movie of db) {
                let movieHtml = `<div class="movie">`;
                movieHtml += `<img class="moviePoster" src="${movie.moviePoster}"/>`;
                movieHtml += '</div>';
                allMoviesHtml += movieHtml;
            }

            let responseHtml = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', allMoviesHtml);

            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.write(responseHtml);
            response.end();
        }));
    } else if (request.path === '/addMovie' && request.method === 'GET') {
        fs.readFile('../views/addMovie.html', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            response.writeHead(200, {
                'Content-Type': 'text/html'
            });

            response.write(data);
            response.end();
        });
    }
};
