import { defineStore } from 'pinia';

// During local development
// Later move this to an .env file as VITE_API_BASE_URL
const API_URL = 'http://localhost:5000/api/invoices';

export const useInvoiceStore = defineStore('invoice', {
  // State is the data
  state: () => ({
    invoices: [],
    loading: false,
    error: null,
  }),

  // Getters are computed data
  getters: {
    unpaidInvoices: (state) =>
      state.invoices.filter((inv) => inv.status === 'Unpaid'),
    totalInvoices: (state) => state.invoices.length,
  },

  // Actions are functions that modify data
  actions: {
    async fetchInvoices() {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch(API_URL);

        if (!res.ok) throw new Error(`Server response ${res.status}`);
        this.invoices = await res.json();
      } catch (err) {
        console.error('fetchInvoices Failed', err);
        this.error = 'Unable to load invoices;';
      } finally {
        this.loading = false;
      }
    },

    async addInvoice(invoice) {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(invoice),
        });

        if (!res.ok) throw new Error(`Server responded ${res.status}`);

        await this.fetchInvoices(); // refreshes the list
      } catch (err) {
        console.error('addInvoice Failed', err);
        this.error = 'Could not add invoice';
      }
    },

    async removeInvoice(id) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

        if (!res.ok) throw new Error(`Server responded ${res.status}`);

        this.invoices = this.invoices.filter((inv) => inv.id !== id);
      } catch (err) {
        console.error('removeInvoice Failed', err);
        this.error = 'Could not delete invoice';
      }
    },

    async markAsPaid(id) {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: 'Paid',
            date_paid: new Date().toISOString(),
          }),
        });
        if (!res.ok) throw new Error(`Server resonded ${res.status}`);
        await this.fetchInvoices();
      } catch (err) {
        console.error('markAsPaid Failed', err);
        this.error = 'Could no tupdate invoice status';
      }
    },
  },

  persist: true,
});
