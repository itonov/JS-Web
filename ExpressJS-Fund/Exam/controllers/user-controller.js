const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Team = require('../models/Team');
const Project = require('../models/Project');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },
    registerPost: async (req, res) => {
        const reqUser = req.body;
        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password);
        try {
            const user = await User.create({
                username: reqUser.username,
                hashedPass,
                salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                profilePicUrl: reqUser.profilePicUrl,
                roles: ['User']
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('user/register', user);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('user/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('user/login');
    },
    loginPost: async (req, res) => {
        const reqUser = req.body;
        try {
            const user = await User.findOne({username: reqUser.username});
            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(err);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandler(e);
        }

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('user/login');
        }
    },
    profile: (req, res) => {
        const userId = req.user._id;
        User.findById(userId)
            .populate('teams')
            .then((user) => {
                let projects = [];
                user.teams.forEach(team => {
                    team.projects.forEach(project => {
                        Project.findById(project)
                            .then((result) => {
                                projects.push(result);

                                const teams = user.teams;
                                if (projects.length > 0) {

                                    res.render('user/profile', {projects, teams, profilePic: user.profilePicUrl});
                                } else {
                                    res.render('user/profile', {teams, profilePic: user.profilePicUrl});
                                }
                            })
                    });
                });
            })
            .catch(console.error);
    },
    leaveTeam: (req, res) => {
        const userId = req.user._id;
        console.log(userId);
    }
};