var mongoose = require('mongoose'); // ORM

mongoose.Promise = global.Promise; // this is to declare mongoose promise.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TODO'); // connects to the database.

module.exports = {mongoose};