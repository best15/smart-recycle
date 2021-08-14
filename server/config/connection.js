const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(
  (process.env.NODE_ENV === 'production') ? process.env.MONGODB_URI : 'mongodb://localhost/smart-recycle',
  // process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
