const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    //customized id, but loose the native functions with the objectID, may not be compatitable to use findByID()
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
    checkedoutLogs: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Checkingout'
        }
    ]
});

module.exports = mongoose.model('Student',studentSchema);