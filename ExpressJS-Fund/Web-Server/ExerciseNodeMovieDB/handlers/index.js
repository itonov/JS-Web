const staticHandler = require("./staticFileHandler");
const homeHandler = require("./homeHandler");
const movieHandler = require("./movieHandler");

module.exports = [staticHandler, homeHandler, movieHandler];