const express = require('express');
const cors = require('cors');
const { makeApiRequest } = require('./codeforces');
require('dotenv').config(); // Load environment variables from .env file
const app = express();
const port = process.env.PORT; // Replace with your desired port number
app.use(cors());

// Define your API endpoint
app.get('/api/friends', async (req, res) => {
  try {
    const response = await makeApiRequest('user.friends', {
      handle: process.env.HANDLE,
      apiKey: process.env.API_KEY, // Access API key from environment variable
      time: Math.floor(Date.now() / 1000),
    });
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('API request failed:', error);
    res.status(500).json({ error: 'API request failed' });
  }
});

app.get('/api/status/:handle', async (req, res) => {
  try {
    const { handle } = req.params;
    const response = await makeApiRequest('user.status', {
      handle: handle,
      apiKey: process.env.API_KEY, // Access API key from environment variable
      time: Math.floor(Date.now() / 1000),
    });
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('API request failed:', error);
    res.status(500).json({ error: 'API request failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
