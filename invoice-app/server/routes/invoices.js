import express from 'express';
import {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from '../controllers/invoiceController.js';

const router = express.Router();

// GET all invoices
router.get('/', getAllInvoices);

// GET single invoice by ID
router.get('/:id', getInvoiceById);

// CREATE new invoice
router.post('/', createInvoice);

// UPDATE existing invoice
router.put('/:id', updateInvoice);

// DELETE an invoice
router.delete('/:id', deleteInvoice);

export default router;
