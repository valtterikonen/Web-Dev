const express = require('express');
const app = express();
const port = 3001;

// Endpoint 1: Text Response
app.get('/text', (req, res) => {
  res.send('This is a simple text response.');
});

// Endpoint 2: JSON Response
const jsonData = {
    message: 'This is an updated JSON response.',
    timestamp: new Date()
  };

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});