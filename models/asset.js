const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const assetSchema = new Schema({
    asset_id: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    asset_type: {
        type: String,
        required: true
    },
    tag_number: {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model('Asset',assetSchema);