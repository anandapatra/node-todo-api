const MongoClient = require('mongodb').MongoClient;


// connect to mongo database
MongoClient.connect('mongodb://localhost:27017/TODO', (err, db) => {
if (err) {
    return console.log('Unable to connect to MongoDB');
}
console.log('Connected to MongoDB server');

// insert a new record into ToDos collection 
/*
db.collection('ToDos').insertOne({
    text: 'Some todo text',
    completed: false
}, (err, result) => {
    if (err) {
        return console.log('Unable to insert todo');
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
});*/


db.collection('Users').insertOne({
    name: 'Ananda',
    age: '32',
    localtion: 'Sayreville'
}, (err, result) => {
    if (err) {
        return console.log('Unable to insert todo');
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
});
 
db.close();
});