-- ==================================================
-- MiniBill Database Schema 
-- ==================================================

PRAGMA foreign_keys = ON;

-- =========================================
-- Clients Table
-- =========================================
CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  company TEXT,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0,1)), --0 = action 1 = inactive
  created_on TEXT NOT NULL DEFAULT (datetime('now')),
  updated_on TEXT NOT NULL DEFAULT (datetime('now'))
);

-- =========================================
-- Invoices Table
-- =========================================
CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY,
  client_id INTEGER NOT NULL,
  amount_cents INTEGER NOT NULL CHECK(amount_cents >= 0), -- Invocies are stored in cents for more accurate decimal rounding
  status TEXT NOT NULL DEFAULT 'Unpaid' CHECK(status IN ('Paid', 'Unpaid')),
  date_created TEXT NOT NULL DEFAULT (datetime('now')),
  date_paid TEXT,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE RESTRICT,
  CHECK ((status = 'Paid') = (date_paid IS NOT NULL)) -- Ensures if the invoice is marked paid, ther should be a date_paid and vice versa
);


-- =========================================
-- Indexes speed up search queries on specific columns
-- =========================================
CREATE INDEX IF NOT EXISTS idx_invoices_client ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);