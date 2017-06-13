var express = require('express');
var bodyParser = require('body-parser');
var mongoosel = require('mongoose');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());

// post todo
app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    
    todo.save().then((doc)=> {
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
