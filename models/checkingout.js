const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const checkingoutSchema = new Schema({
    asset:{
        type: Schema.Types.ObjectId,
        ref: 'Asset'
    },
    student:{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }
},
{timestamps: true}
);

module.exports = mongoose.model('Checkingout',checkingoutSchema);