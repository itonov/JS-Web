const Team = require('../models/Team');
const User = require('../models/User');

module.exports = {
    viewAllGet: (req, res) => {
        if (req.user.roles.findIndex(role => role === 'Admin') > -1) {
            User.find({})
                .then((users) => {
                    Team.find({})
                        .then((teams) => {
                            res.render('team/teams-admin', {users, teams});
                        })
                })
                .catch(console.error);
        } else {
            Team.find({})
                .then((teams) => {
                    res.render('team/teams-user', {teams});
                })
                .catch(console.error);
        }
    },
    viewAllPost: (req, res) => {
        if (req.user.roles.findIndex(role => role === 'Admin') > -1) {
            const {userId, teamId} = req.body;

            User.findById(userId)
                .populate('teams')
                .then((user) => {
                    if (user.teams.length === 0
                        || user.teams.findIndex(team => team._id.toString() === teamId.toString()) === -1) {
                        Team.findById(teamId)
                            .then((team) => {
                                user.teams.push(team._id);
                                team.members.push(user._id);
                                return Promise.all([user.save(), team.save()]);
                            });
                    }
                })
                .then(() => {
                    res.redirect('/');
                })
                .catch(console.error);
        } else {
            const searchName = req.body.searchInput.toLowerCase();
            Team.find({})
                .then((allTeams) => {
                    const teams = allTeams.filter(team => team.name.toLowerCase().includes(searchName));
                    res.render('team/teams-user', {teams});
                })
                .catch(console.error);
        }

    },
    createGet: (req, res) => {
        res.render('team/create');
    },
    createPost: (req, res) => {
        const {teamName} = req.body;

        const team = new Team({name: teamName});

        team.save()
            .then(() => {
                res.redirect('/');
            })
            .catch(console.error);
    }
};