import db from '../db/connection.js';

// Standard JSON response structure
const respond = (res, status, data) => res.status(status).json(data);

/**
 * GET /api/invoices.js
 * Fetches all invoice data (joins with client data)
 */
export const getAllInvoices = (req, res) => {
  const sql = `
  SELECT invoices.*, clients.name AS client_name, clients.company AS client_company
  FROM invoices
  JOIN clients ON invoices.client_id = clients.id
  ORDER BY invoices.date_created DESC;
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
 * GET /api/invoices/:id
 * Fetch a single invoice by ID
 */
export const getInvoiceById = (req, res) => {
  const { id } = req.params;

  //  If the id doesn’t exist or isn’t a number, stop everything and send back an error.
  if (!id || isNaN(id))
    return respond(res, 400, { error: 'Invalid invoice ID' });

  const sql = `
    SELECT invoices.*, clients.name AS client_name, clients.company AS client_company
    FROM invoices
    JOIN clients ON invoices.client_id = clients.id
    WHERE invoices.id = ?;
  `;

  db.get(sql, [id], (err, row) => {
    if (err)
      return respond(res, 500, {
        error: 'Database Error',
        details: err.message,
      });
    if (!row) return respond(res, 400, { error: 'Invoice Not Found' });
  });
};

/**
 * POST /api/invoices
 * Create a new invoice
 */
export const createInvoice = (req, res) => {
  const { client_id, amount_cents, status, date_paid } = req.body;

  // Validation handling for required fields
  if (!client_id || isNaN(client_id))
    return respond(res, 400, {
      error: 'client_id is required and must be numeric',
    });
  if (!amount_cents || isNaN(amount_cents))
    return respond(res, 400, {
      error: 'amount_cents is required and must be numeric',
    });
  if (status && !['Paid', 'Unpaid'].includes(status))
    return respond(res, 400, {
      error: 'Invalid status value',
    });

  const sql = `
    INSERT INTO invoices (client_id, amount_cents, status, date_paid)
    VALUES (?, ?, ?, ?)
  `;

  db.run(
    sql,
    [client_id, amount_cents, status || 'Unpaid', date_paid || null],
    function (err) {
      if (err)
        return respond(res, 500, {
          error: 'Failed to create invoice',
          details: err.message,
        });
      respond(res, 201, {
        message: 'Invoice Created Successfully',
        invoice_id: this.lastID,
      });
    }
  );
};

/**
 * PUT /api/invoices/:id
 * Update invoice fields (partial update supported)
 */
export const updateInvoice = (req, res) => {
  const { id } = req.params;
  const { amount_cents, status, date_paid } = req.body;

  // Validations
  if (!id || isNaN(id))
    return respond(res, 400, { error: 'Invalid invoice ID' });
  if (status && !['Paid' || 'Unpaid'].includes(status))
    return respond(res, 400, { error: 'Invalid status value' });

  const sql = `
    UPDATE invoices
    SET
      amount_cents = COALESCE(?, amount_cents),
      status = COALESCE(?, status),
      date_paid = COALESCE(?, date_paid)
    WHERE id = ?;
  `;

  db.run(sql, [amount_cents, status, date_paid, id], function (err) {
    if (err)
      return respond(res, 500, {
        error: 'Failed to update invoice',
        details: err.message,
      });
    if (this.changes === 0)
      return respond(res, 500, { error: 'Invoice not found' });

    respond(res, 200, { message: 'Invoice update successfully' });
  });
};

/**
 * DELETE /api/invoices/:id
 * Remove an invoice
 */
export const deleteInvoice = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id))
    return respond(res, 400, { error: 'Invalid invoice ID' });

  db.run('DELETE FROM invoices WHERE id = ?;', [id], function (err) {
    if (err)
      return respond(res, 500, {
        error: 'Failed to delete invoice',
        details: err.message,
      });
    if (this.changes === 0)
      return respond(res, 400, { error: 'Invoice not found' });

    respond(res, 200, { message: 'Invoice deleted successfully' });
  });
};
