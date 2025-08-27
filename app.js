npm install express
// Import Express.js
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Route for GET requests
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'EAAaXKa9hIr4BPREe7mKRUbZCCfZA9bpl1l4FlYbZC1ZCDU7Y9Vc2dMfgFFcd83HNdEOAdnqwVRVNHsZBiR9qIhITlFwrZBKSo7HZBk7IPK4G5a0Mj9PWJ0GYBIpDKuu25OIMaCd5mgFQ7eARpgMCisWe8aZBf8Nu9w1WBpHnfoblkjmnNhO7aCRMk2uiR4GmZBXlMGQPLH1jIUCNwntoH0IsAG4EFohjaqGZByS1lB7UyfPiZCOkAZDZD': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Route for POST requests
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});
