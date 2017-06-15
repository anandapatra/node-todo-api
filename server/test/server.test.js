const expect = require('expect');
const request = require('supertest');
var {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const todos = [ {
   _id: new ObjectID(),
   text: 'First to do test'
}, {
   _id: new ObjectID(),
   text: 'second to do test'
}];



beforeEach((done) => {
    Todo.remove({}).then(()=> {
       Todo.insertMany(todos)
       }).then(()=> {
           done();
    });
});

describe('POST /todos', ()=> {
    
     it('should create a new todo', (done)=> {
           var text = 'Test todo text';
           request(app)
           .post('/todos')
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
         .expect(200)
         .expect((res) => {
             expect(res.body.length).toBe(2);
         }).end(done);
    });

});

// test case for /todo/:id 
describe('GET /todo/:id', ()=> {
    it('it should return todo doc',(done)=>{
        request(app)
        .get(`/todo/${todos[0]._id.toHexString()}`)
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
        .send(todos[0])
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



