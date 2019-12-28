const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gtid: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Student',studentSchema);