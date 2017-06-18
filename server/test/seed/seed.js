var {ObjectID} = require('mongodb');
var {Todo} = require('./../../models/todo');
var {User} = require('./../../models/user');
var jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id : userOneId,
  email : 'patra@example.com',
  password : 'password1',
  tokens : [
    {
      access: 'auth',
      token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()

    }
  ]
},
{
  _id : userTwoId,
  email : 'patra2@example.com',
  password : 'password2',
  tokens : [
    {
      access: 'auth',
      token: jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString()

    }
  ]
}];

const todos = [ {
   _id: new ObjectID(),
   text: 'First to do test',
   _creator: userOneId
}, {
   _id: new ObjectID(),
   text: 'second to do test',
   _creator: userTwoId
}];

const populateTodos = (done) => {
    Todo.remove({}).then(()=> {
       Todo.insertMany(todos)
       }).then(()=> {
           done();
    });
}

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(()=> done());
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
}
