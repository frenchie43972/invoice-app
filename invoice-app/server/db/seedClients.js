import db from './connection.js';

// Dummy clients to seed
const clients = [
  {
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '555-123-4567',
    company: 'Acme Corp',
  },
  {
    name: 'Beta Industries',
    email: 'hello@betaindustries.com',
    phone: '555-987-6543',
    company: 'Beta Industries',
  },
  {
    name: 'Gamma Solutions',
    email: 'support@gammasolutions.io',
    phone: '555-222-1111',
    company: 'Gamma Solutions',
  },
];

// Checks if client exists
db.all('SELECT COUNT(*) AS count FROM clients', [], (err, rows) => {
  if (err) {
    console.error('❌ Error checking clients table:', err.message);
    return;
  }

  const count = rows[0].count;
  if (count > 0) {
    console.log(
      `⚠️ Clients table already has ${count} records. Skipping seeding.`
    );
    db.close();
    return;
  }
});

console.log('🌱 Seeding dummy Clients...');

// Insert dummy clients
const stmt = db.prepare(
  `INSERT INTO clients (name, email, phone, company) VALUES (?, ?, ?, ?);`
);

for (const client of clients) {
  stmt.run([client.name, client.email, client.phone, client.company]);
}

stmt.finalize((err) => {
  if (err) {
    console.error('❌ Error inserting clients:', err.message);
  } else {
    console.log(`✅ Seeded ${clients.length} clients successfully.`);
  }
  db.close();
});
