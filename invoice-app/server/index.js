import express from 'express';
import cors from 'cors';

import db from './db/connection.js';

// Creates the express app instance
const app = express();

//  Middleware setup
// - express.json(): parses incoming JSON requests into JS objects
// - cors(): allows frontend (running on another port) to communicate with backend
app.use(express.json());
app.use(cors());

//  Basic test route
// - When you visit http://localhost:5000/ in your browser,
//   this route sends a simple confirmation message.
app.get('/', (req, res) => {
  res.send('✅ MiniBill Backend is running');
});

// TEMP TEST ROUTE – delete later
app.get('/api/test-db', (req, res) => {
  db.all('SELECT date("now") as currentDate', [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database test failed' });
    } else {
      res.json({ message: 'Database connected', date: rows[0].currentDate });
    }
  });
});

// Start the server
// - Use PORT 5000 (common for API backends)
// - app.listen() activates the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
