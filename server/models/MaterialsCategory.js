const { Schema, model } = require('mongoose');


const categoryschema = new Schema({
  categoryname: {
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

const Category = model('Category', categoryschema);

module.exports = Category;
