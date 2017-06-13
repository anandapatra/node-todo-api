const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const todos = [ {
   text: 'First to do test'
}, {
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


