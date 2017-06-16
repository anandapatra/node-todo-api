var {SHA256} = require('crypto-js');


var message = "password"
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);