var express = require('express');
var bodyParser = require('body-parser');
var mongoosel = require('mongoose');
var {ObjectID} = require('mongodb');


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
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });  
});


// get todo
app.get('/todos', (req, res) => {

   Todo.find().then((docs)=>{
      res.send(docs);
   }, (e) => {
      res.status(400).send(e);
   }); 
});


// get todo by id 

app.get('/todo/:id', (req, res)=> {    
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send({status: 'Object ID is invalid'});
    }
    Todo.findById(id).then((doc)=> {
        if (!doc)
         return res.status(400).send({status: 'Document is not found'});
        res.send(doc);
    }, (e) => {
        res.status(400).send({status: 'Unable to process'});
    });
    
});



app.listen(3000, () =>{
    console.log('Server started on port 3000');
})

module.exports = {app};
