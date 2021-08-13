const { Schema, model } = require('mongoose');


const materialSchema = new Schema({
    materialname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },


});

const Material = model('Material', materialSchema);

module.exports = Material;
