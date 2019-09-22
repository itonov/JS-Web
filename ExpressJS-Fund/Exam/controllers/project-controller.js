const Project = require('../models/Project');
const Team = require('../models/Team');

module.exports = {
    viewAllGet: (req, res) => {
        Project.find({})
            .populate('team')
            .then((projects) => {
                if (req.user.roles.findIndex(role => role === 'Admin') > -1) {
                    const displayProjects = projects.filter(project => !project.team);

                    Team.find({})
                        .then((teams) => {
                            res.render('project/projects-admin', {displayProjects, teams});
                        });
                } else {
                    res.render('project/projects-user', {projects});
                }
            })
            .catch(console.error);
    },
    viewAllPost: (req, res) => {
        if (req.user.roles.findIndex(role => role === 'Admin') > -1) {
            const {teamId, projectId} = req.body;

            Project.findById(projectId)
                .then((project) => {
                    Team.findById(teamId)
                        .then((team) => {
                            team.projects.push(project._id);
                            project.team = teamId;
                            return Promise.all([team.save(), project.save()]);
                        });
                })
                .then(() => {
                    res.redirect('/');
                })
                .catch(console.error);
        } else {
            const searchName = req.body.searchText.toLowerCase();
            Project.find({})
                .then((allProjects) => {
                    const projects = allProjects.filter(project => project.name.toLowerCase().includes(searchName));
                    res.render('project/projects-user', {projects});
                })
                .catch(console.error);
        }
    },
    createGet: (req, res) => {
        res.render('project/create');

    },
    createPost: (req, res) => {
        const {name, description} = req.body;

        const project = new Project({name, description});

        project.save()
            .then(() => {
                res.redirect('/');
            })
            .catch(console.error);

    }
};