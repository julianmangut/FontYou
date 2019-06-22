const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    password: String
}, {
    strict: false
});

module.exports = mongoose.model('User', UserSchema);