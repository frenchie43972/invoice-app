import sqlite3 from 'sqlite3';

// Enable verbose mode so it will display more information. Better for debugging
sqlite3.verbose();

// Create and export a single shared database connection
// - The database file will be created if it doesn't exist yet
const db = new sqlite3.Database('./server/db/database.db', (err) => {
  if (err) {
    console.error('❌ Failed to connect to SQLite database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database.');
  }
});

export default db;
