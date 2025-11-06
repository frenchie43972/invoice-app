import express from 'express';
import cors from 'cors';

import invoiceRoutes from './routes/invoices.js';
import clientRoutes from './routes/clients.js';

// Creates the express app instance
const app = express();

//  Middleware setup
// - express.json(): parses incoming JSON requests into JS objects
// - cors(): allows frontend (running on another port) to communicate with backend
app.use(express.json());
app.use(cors());

app.use('/api/invoices', invoiceRoutes);
app.use('/api/clients', clientRoutes);

// Start the server
// - Use PORT 5000 (common for API backends)
// - app.listen() activates the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
