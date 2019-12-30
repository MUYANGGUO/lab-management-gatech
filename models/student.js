const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    //customized id, but loose the native functions with the objectID, may not be compatitable to use findByID()
    _id: {
        type: String,
        required: true
    },
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