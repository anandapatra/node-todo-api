const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');


var id = '59407ef890d3eb0d60b4fdc0';

// var id = '69407ef890d3eb0d60b4fdc0'; returns null
// var id = '59407ef890d3eb0d60b4fdc01'; returns invalid id

Todo.findById(id).then((doc) => {
     console.log(doc);
}).catch((e) => {
    console.log('Id Not found', e);
});

