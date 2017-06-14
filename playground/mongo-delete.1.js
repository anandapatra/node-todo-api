const {MongoClient, ObjectID} = require('mongodb');

// connect to mongo database
MongoClient.connect('mongodb://localhost:27017/TODO', (err, db) => {
if (err) {
    return console.log('Unable to connect to MongoDB');
}
console.log('Connected to MongoDB server');


// deleteMany

// db.collection('ToDos').deleteMany({text: 'Pickup Medicine'}).then((result) => {
//    console.log(result);
// });


// deleteOne 
// db.collection('ToDos').deleteOne({text: 'Pickup Medicine'}).then((result) => {
//    console.log(result);
// });

//findOneAndDelete

db.collection('ToDos').findOneAndDelete({text: 'Pickup Medicine'}).then((result) => {
   console.log(result);
});


db.close();

});