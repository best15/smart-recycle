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

    materials: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Material'
        },
    ]

});

const RecycleCenter = model('RecycleCenter', recyclecenterschema);

module.exports = RecycleCenter;
