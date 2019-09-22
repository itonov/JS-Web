const Cube = require('../models/Cube');

function handleErrors(err, res) {
    let errors = [];

    for (const prop in err.errors) {
        errors.push(err.errors[prop].message);
    }

    res.locals.globalErrors = errors;
    res.render("cube/create");
}

module.exports = {
    createGet: (req, res) => {
        res.render("cube/create");
    },
    createPost: (req, res) => {
        const cubeBody = req.body;
        cubeBody.difficulty = Number(cubeBody.difficulty);
        Cube.create(cubeBody)
            .then(() => {
                res.redirect("/");
            })
            .catch((err) => handleErrors(err, res));
    },
    details: (req, res) => {

    }
};