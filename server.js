const http = require('http');
const _ = require('lodash'); 
const server = http.createServer((req, res) => {
  // lodash
const num = _.random(0,20);
console.log(num)



    



});

server.listen(3000, 'localhost', () => {
    console.log("server listen to theport 3000")
})


