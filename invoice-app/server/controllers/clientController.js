import db from '../db/connection.js';

// Need to possibly turn this into a project wide use variable
const respond = (res, status, data) => res.status(status).json(data);

/**
 * GET /api/clients
 * Fetches all clients
 */
export const getAllClients = (req, res) => {
  const sql = `
    SELECT * 
    FROM clients 
    ORDER BY created_on DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err)
      return respond(res, 500, {
        error: 'Database Error',
        details: err.message,
      });
    respond(res, 200, rows);
  });
};

/**
 * GET /api/clients/:id
 * Fetch a single client by ID
 */
export const getClientById = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id))
    return respond(res, 400, { error: 'Invalid client ID' });

  const sql = `
    SELECT * 
    FROM clients
    WHERE id = ?
  `;

  db.get(sql, [id], (err, row) => {
    if (err)
      return respond(res, 500, {
        error: 'Database Error',
        details: err.message,
      });
    if (!row) return respond(res, 404, { error: 'Client Not Found' });
    respond(res, 200, row);
  });
};

/**
 * POST /api/clients
 * Create a new client
 */
export const createClient = (req, res) => {
  const { name, email, phone, company } = req.body;

  // Validation for required fields
  if (!name?.trim())
    return respond(res, 400, { error: 'Client name is required' });

  const sql = `
    INSERT INTO clients (name, email, phone, company)
    VALUES (?, ?, ?, ?);
  `;

  db.run(sql, [name, email, phone, company], function (err) {
    if (err)
      return respond(res, 500, {
        error: 'Failed to create client',
        detailes: err.message,
      });

    respond(res, 201, {
      message: 'Client created Successfully',
      client_id: this.lastID,
    });
  });
};

/**
 * PUT /api/clients/:id
 * Update client fields (partial update supported)
 */
export const updateClient = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, company, is_active } = req.body;

  if (!id || isNaN(id))
    return respond(res, 400, { error: 'Invalid client ID' });

  const sql = `
    UPDATE clients
    SET 
      name = COALESCE(?, name),
      email = COALESCE(?, email),
      phone = COALESCE(?, phone),
      company = COALESCE(?, company),
      is_active = COALESCE(?, is_active),
      updated_on = datetime('now')
    WHERE id = ?;
  `;

  db.run(sql, [name, email, phone, company, is_active, id], function (err) {
    if (err)
      return respond(res, 500, {
        error: 'Failed to update client',
        details: err.message,
      });
    if (this.changes === 0)
      return respond(res, 404, { error: 'Client not found' });

    respond(res, 200, { message: 'Client updated Successfully' });
  });
};

/**
 * DELETE /api/clients/:id
 * Remove a client
 */
export const deleteClient = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id))
    return respond(res, 400, { error: 'Invalid client ID' });

  const sql = `DELETE FROM clients WHERE id = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      if (err.message.includes('FOREIGN KEY contraint failed')) {
        return respond(res, 400, {
          error: 'Cannot delete client with existing invoices',
        });
      }
      return respond(res, 500, {
        error: 'Failed to delete client',
        detailes: err.message,
      });
    }

    if (this.changes === 0)
      return respond(res, 404, { error: 'Client not found' });

    respond(res, 200, { message: 'Client Deleted Successfully' });
  });
};
