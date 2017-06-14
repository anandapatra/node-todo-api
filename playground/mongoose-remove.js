const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// var id = '594166761fc0253c1862b766'
// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findOneAndRemove({_id:'594166761fc0253c1862b766'}).then((todo) => {
    console.log(todo);
});

Todo.findByIdAndRemove('594166761fc0253c1862b766').then((todo) => {
    console.log(todo);
});
