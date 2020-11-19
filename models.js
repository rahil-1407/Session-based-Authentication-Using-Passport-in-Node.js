const mongoose = require('mongoose');

//Schema of Login DB
const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = new mongoose.model('user', userschema);
