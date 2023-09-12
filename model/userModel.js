const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phNo: {
        type: String,
        required: true
    },
    almsgdata: {
        type: Array,
        required: true
    },
    clientIp: {
        type: String,
        required: true
    },
    browserInfo: {
        type: Object,
        required: true
    }
});

const user = mongoose.model('Users', schema);

module.exports = user;

