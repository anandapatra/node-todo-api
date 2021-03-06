const expect = require('expect');
const request = require('supertest');
var {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', ()=> {

     it('should create a new todo', (done)=> {
           var text = 'Test todo text';
           request(app)
           .post('/todos')
           .set('x-auth', users[0].tokens[0].token)
           .send({text})
           .expect(200)
           .expect((res) => {
               expect(res.body.text).toBe(text);
           })
           .end((err, res) => {
                if (err)
                   return done(err);
                Todo.find({text}).then((todos)=> {
                      expect(todos.length).toBe(1);
                      expect(todos[0].text).toBe(text);
                      done();
                }).catch((e) => {
                    done(e);
                });
           });
     });

     it('it should not create a new todo', (done)=> {
           request(app)
           .post('/todos')
           .set('x-auth', users[0].tokens[0].token)
           .send({})
           .expect(400)
           .expect((res) => {
               expect(res.body.text).toBe(undefined);
           })
           .end((err, res) => {
                if (err)
                   return done(err);
                Todo.find().then((todos)=> {
                      expect(todos.length).toBe(2);
                      done();
                }).catch((e) => {
                    done(e);
                });
           });
     });
});

describe('GET /todos', ()=> {

    it('should get todo data', (done)=> {
         request(app)
         .get('/todos')
         .set('x-auth', users[0].tokens[0].token)
         .expect(200)
         .expect((res) => {
             expect(res.body.length).toBe(1);
         }).end(done);
    });

});

// test case for /todo/:id
describe('GET /todo/:id', ()=> {
    it('it should return todo doc',(done)=>{
        request(app)
        .get(`/todo/${todos[0]._id.toHexString()}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(todos[0].text);
        }).end(done);
    });

    // add more test for invalid object id


    // add more test for no result
});


// test case for /todo/:id
describe('DELETE /todo/:id', ()=> {
    it('it should remove todo doc',(done)=>{
        request(app)
        .delete(`/todo/${todos[1]._id.toHexString()}`)
        .set('x-auth', users[1].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(todos[1].text);
        }).end(done);
    });

    Todo.findById(todos[1]._id.toHexString()).then((doc) =>{
         expect(null).toNotExist();
         done();
    }).catch((e) => done(e));

    // add more test for invalid object id


    // add more test for no result
});


// test case for /todo/:id
describe('PATCH /todo/:id', ()=> {
    it('it should patch todo doc',(done)=>{
        request(app)
        .patch(`/todo/${todos[1]._id.toHexString()}`)
        .set('x-auth', users[1].tokens[0].token)
        .send(todos[1])
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(todos[0].text);
        }).end(done);
    });

    Todo.findById(todos[1]._id.toHexString()).then((doc) =>{
         expect(null).toNotExist();
         done();
    }).catch((e) => done(e));

    // add more test for invalid object id


    // add more test for no result
});


describe('GET /user/me', () => {
  it('shoud return user if authenticated', (done) => {
      request(app)
      .get('/user/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res)=> {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authentiated', (done) => {
     request(app)
     .get('/user/me')
     .set('x-auth', 'qweq')
     .expect(401)
     .expect((res) =>{
         //console.log(res);
         expect(res.body).toEqual({});
     })
     .end(done);
  });
})

describe('POST /user', ()=> {
  it('should craete a user', (done)=>{
      var email = 'example@example.com';
      var password = '123abc!';

      request(app)
      .post('/user')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end(done);
  })

  it('should return validation error if request invalid', (done)=>{
       var email = 'abc.com';
       var password = '1213';

       request(app)
       .post('/user')
       .send({email, password})
       .expect(400)
       .end(done);
  })

  it('shuould not crate user if email in use', (done)=>{
    var email = 'xample@example.com';
    var password = '1213';

    request(app)
    .post('/user')
    .send({email, password})
    .expect(400)
    .end(done);
  })
});

describe('POST /user/login', () => {

  it ('should login user and return auth token', (done) => {
      request(app)
      .post('/user/login')
      .send({
        email : users[1].email,
        password: users[1].password
      }).expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[0]).toInclude({
             access: 'auth',
             token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
  });

  it ('should reject invalid login', (done) => {
    request(app)
    .post('/user/login')
    .send({
      email : users[1].email,
      password: 'passwordtest'
    }).expect(400)
    .expect((res) => {
      expect(res.headers['x-auth']).toNotExist();
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      done();
    });
  });

});

describe ('DELETE /user/me/token', () => {
  it('should remove auth token at log out', (done) => {
      var id = users[0]._id;
      request(app)
      .delete('/user/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
          expect(res.headers['x-auth']).toNotExist();
          User.findById(id).then((user) => {
                expect(user.tokens).notToExist();
          });
          done();

      })
      .end(()=> (done));
  });
});
