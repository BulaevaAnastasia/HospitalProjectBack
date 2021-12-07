const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userScheme = new Schema ({
    id: String,
    login: String,
    password: String
});

const User = mongoose.model('user', userScheme);
module.exports = User;