// app.js

const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const route = require('./route');

let message = '';
fs.readFile('message.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    message = data;
  }
});

http.createServer((req, res) => {
  if (req.method === 'GET') {
    route.handleGetRequest(req, res, message);
  } else if (req.method === 'POST') {
    route.handlePostRequest(req, res, (newMessage) => {
      message = newMessage;
      fs.writeFile('message.txt', newMessage, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  }
}).listen(3000);
console.log('Server running at http://localhost:3000/');

