const http = require('http');
const fs = require('fs');
const qs = require('querystring');

// Read the message from a file
let message = '';
fs.readFile('message.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    message = data;
  }
});

// Create a server
http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Display the form and the message
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`
      <html>
        <body>
          <div>${message}</div>
          <form method="POST">
            <input type="text" name="newMessage">
            <button type="submit">Send</button>
          </form>
        </body>
      </html>
    `);
    res.end();
  } else if (req.method === 'POST') {
    // Update the message with the new one
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      let newMessage = qs.parse(body).newMessage;
      message = newMessage;
      fs.writeFile('message.txt', newMessage, (err) => {
        if (err) {
          console.error(err);
        }
      });
      // Redirect to the same page to display the updated message
      res.writeHead(302, {'Location': '/'});
      res.end();
    });
  }
}).listen(3000);
console.log('Server running at http://localhost:3000/');

