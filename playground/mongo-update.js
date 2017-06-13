const {MongoClient, ObjectID} = require('mongodb');

// connect to mongo database
MongoClient.connect('mongodb://localhost:27017/TODO', (err, db) => {
if (err) {
    return console.log('Unable to connect to MongoDB');
}
console.log('Connected to MongoDB server');


//findOneAndUpdate

// db.collection('ToDos').findOneAndUpdate({
//   _id: new ObjectID('5940130c4c7b87b0a11c9989')
// },  
// {
//   $set: {
//    completed:true 
//   }
// }, 
// {
//   returnOriginal: false  
// }).then((result) => {
//    console.log(result);
// });

db.collection('Users').findOneAndUpdate( {
    name : 'Ayaan'
},
{   $set: {
      name: 'Big Ayaan'
    },
    $inc: {
       age: 1
    }
},
{
    returnOriginal : false
}).then((result) => {
   console.log(result);
});


db.close();

});