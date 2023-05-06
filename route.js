// route.js

const handleGetRequest = (req, res, message) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
        <html>
          <body>
            <h1>Message Board</h1>
            <div>${message}</div>
            <form method="POST">
              <input type="text" name="newMessage">
              <button type="submit">Send</button>
            </form>
          </body>
        </html>
      `);
    res.end();
  };
  
  const handlePostRequest = (req, res, callback) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      let newMessage = qs.parse(body).newMessage;
      callback(newMessage);
      res.writeHead(302, { Location: '/' });
      res.end();
    });
  };
  
  module.exports = { handleGetRequest, handlePostRequest };
  