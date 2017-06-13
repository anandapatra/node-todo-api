const {MongoClient, ObjectID} = require('mongodb');

// connect to mongo database
MongoClient.connect('mongodb://localhost:27017/TODO', (err, db) => {
if (err) {
    return console.log('Unable to connect to MongoDB');
}
console.log('Connected to MongoDB server');

// find data using mongo native library
// db.collection('ToDos').find({completed: false}).toArray().then((docs) => {
//    console.log('Todos');
//     console.log(JSON.stringify(docs, undefined, 2));
// }, (err) => {
//     console.log('Unable to collect data', err);
// });

// count data using mongo native library
// db.collection('ToDos').find().count().then((count) => {
//    console.log('Todos Count ', count);   
// }, (err) => {
//     console.log('Unable to collect data', err);
// });

// find users named 'Ananda'
db.collection('Users').find({name:'Ananda'}).toArray().then((docs)=>{
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
}, (err) => {
    console.log('Unable to collect data', err);
});
 
db.close();
});