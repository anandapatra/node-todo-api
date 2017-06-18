require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');
var mongoosel = require('mongoose');
var _ = require('lodash');
var {authenticate} = require('./middleware/authenticate');
var {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;
app.use(bodyParser.json());


// post todo
app.post('/todos', authenticate, (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc)=> {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


// get todo
app.get('/todos', authenticate, (req, res) => {

   Todo.find({
     _creator: req.user._id
   }).then((docs)=>{
      res.send(docs);
   }, (e) => {
      res.status(400).send(e);
   });
});


// get todo by id

app.get('/todo/:id', authenticate, (req, res)=> {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send({status: 'Object ID is invalid'});
    }
    Todo.findOne({
      _id: id,
      _creator: request.user._id
      }).then((doc)=> {
        if (!doc)
         return res.status(400).send({status: 'Document is not found'});
        res.send(doc);
    }, (e) => {
        res.status(400).send({status: 'Unable to process'});
    });

});

// remove a todo by id

app.delete('/todo/:id', authenticate, (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send({status: 'Object ID is invalid'});
    }
    Todo.findOneAndRemove({_id: id,
    _creator: req.user._id}).then((doc)=> {
        if (!doc) {
            return res.status(400).send({status: 'Document is not found'});
        }
        res.send(doc);
    }, (e) => {
        res.status(400).send({status: 'Unable to process'});
    });
});



// update a todo by id
app.patch('/todo/:id', (req, res)=> {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(400).send({status: 'Object ID is invalid'});
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({_id: id,
    _creator: req.user._id}, {$set: body}, {new:true}).then((doc) => {
            if (!doc) {
                return res.status(400).send({status: 'Document is not found'});
            }
       res.send(doc);
    }, (e) => {
       res.status(400).send({status: 'Unable to process'});
    });

});

// sign up user
app.post('/user', (req, res) => {
      var body = _.pick(req.body, ['email', 'password']);
      var user = new User(body);

      user.save().then(() => {
        return user.generateAuthToken();
      }).then((token)=> {
    //    console.log(token);
        res.header('x-auth', token.tokens[0].token).send(user);

      }).catch((e) => {
    //    console.log('Error Happened', e);
          res.status(400).send(e);
      });

});

// get a user with auth
app.get('/user/me', authenticate, (req, res) => {
     res.send(req.user);
});

// post login user
app.post('/user/login', (req, res) => {
     var body = _.pick(req.body, ['email', 'password']);
     User.findByCredentials(body.email, body.password).then( (user) => {
          user.generateAuthToken().then((token) => {
            res.header('x-auth', token.tokens[0].token).send(user);
          });
     }).catch((e) => {
        res.status(400).send();
     });

});

app.delete('/user/me/token', authenticate, (req, res) => {
  console.log(req.token);
   req.user.removeToken(req.token).then(() => {
     res.status(200).send();
   }, () => {
     res.status(400).send();
   });
});

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});

module.exports = {app};
