const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    favourites: Array
}, {
    strict: false
});

module.exports = mongoose.model('User', UserSchema);