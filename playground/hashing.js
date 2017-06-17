var {SHA256} = require('crypto-js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10,(err, salt)=> {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashedPassword = '$2a$10$p4HwtBwlu91MnVtk/J020.nF5QD9Oc5EPX0xOmuP9YBrGmN9Kqvoq';
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// var data = {
//   id : 10
// };
// var token = jwt.sign(data, 'abc123');
// console.log(token);
//
// var decoded = jwt.verify(token, 'abc123');
// console.log(decoded);

// var message = "password"
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// }
// var token = {
//   data,
//   hash:SHA256(JSON.stringify(data) + 'some secret').toString()
// }
//
// // data changed here
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString()
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'some secret').toString()
//
// if (resultHash === token.hash) {
//   console.log('data was not changed');
// }
// else {
//   console.log('data was changed, do not trust!');
// }
