var express = require('express');
var bodyparser = require('body-parser');
var mongoosel = require('mongoose');


var mongoose = require('./db/mongoose');
//var ToDo = require('./models/todo');
var User = require('./models/user');

var app = express();
app.use(bodyparser.json());


var ToDo = mongoosel.model('ToDos', {
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

// post todo
app.post('/todos', (req, res) => {
    console.log(req.body);
    var newTodo = new ToDo({
        text: req.body.text
    });
    
    newTodo.save().then((doc)=> {
        res.send(doc)
    }, (e) => {
        res.send(e);
    });   

});


// get todo
app.get('/todos', (req, res) => {

});



app.listen(3000, () =>{
    console.log('Server started on port 3000');
})
