var mongoose = require('mongoose');

var ToDo = mongoose.model('ToDos', {
    text : {
       type: String,
       required: true,
       minlength: 1,
       trim: true
    },
    completed : {
       type: Boolean,
       default: false
    },
    completedAt: {
      type: Number,
      default: null
    }
});

module.exports = {
    ToDo
};