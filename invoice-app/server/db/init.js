import fs from 'fs';
import sqlite3 from 'sqlite3';

sqlite3.verbose();

const dbPath = './server/db/database.db';
const schemaPath = './server/db/schema.sql';

//  Reads schema.sql into memory
const schema = fs.readFileSync(schemaPath, 'utf8');

// Creates the db connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database.');
  }
});

// Run the schema
db.exec(schema, (err) => {
  if (err) {
    console.error('❌ Failed to apply schema:', err.message);
  } else {
    console.log('✅ Schema applied successfully.');
  }

  // Verify Tables exist
  db.all('SELECT name FROM sqlite_master WHERE type="table"', (err, rows) => {
    if (err) {
      console.error('❌ Could not list tables:', err.message);
    } else {
      console.log(
        '📋 Tables in database:',
        rows.map((r) => r.name)
      );
    }

    // Close db connection
    db.close();
  });
});
