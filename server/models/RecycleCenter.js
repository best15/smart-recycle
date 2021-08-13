const { Schema, model } = require('mongoose');


const recyclecenterschema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    lattitude: {
        type: Number,
        required: true,
        unique: true,
        trim: true,

    },
    longitude: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    recycling_materials: {
        type: Array,
        required: true,

    }

});

const RecycleCenter = model('RecycleCenter', recyclecenterschema);

module.exports = RecycleCenter;
