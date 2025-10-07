import { defineStore } from 'pinia';

export const useInvoiceStore = defineStore('invoice', {
  // State is the data
  state: () => ({
    invoices: [
      {
        id: 1,
        client: 'Acme Corp',
        amount: 1200,
        dueDate: '2025-10-15',
        status: 'Unpaid',
        datePaid: null,
      },
      {
        id: 2,
        client: 'Beta Industries',
        amount: 800,
        dueDate: '2025-10-20',
        status: 'Paid',
        datePaid: null,
      },
    ],
  }),

  // Getters are computed data
  getters: {
    unpaidInvoices: (state) =>
      state.invoices.filter((inv) => inv.status === 'Unpaid'),
    totalInvoices: (state) => state.invoices.length,
  },

  // Actions are functions that modify data
  actions: {
    addInvoice(invoice) {
      // Assign a new incremental ID
      invoice.id = this.invoices.length + 1;
      this.invoices.push(invoice);
    },
    removeInvoice(id) {
      this.invoices = this.invoices.filter((inv) => inv.id !== id);
    },
    markAsPaid(id) {
      const invoice = this.invoices.find((inv) => inv.id === id);
      if (invoice) invoice.status = 'Paid';
    },
  },

  persist: true,
});
