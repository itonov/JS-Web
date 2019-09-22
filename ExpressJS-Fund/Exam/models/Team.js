const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {type: mongoose.Schema.Types.String, required: true, unique: true},
    projects: [{type: mongoose.Schema.Types.String, ref: 'Project'}],
    members: [{type: mongoose.Schema.Types.String, ref: 'User'}],
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;