import { defineStore } from 'pinia';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/invoices`;

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
    async _handleRequest(promise, errorLabel) {
      this.loading = true;
      this.error = null;
      try {
        const res = await promise;
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        return res;
      } catch (err) {
        console.error(`${errorLabel}`, err);
        this.error = { message: errorLabel, detail: err.message };
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async fetchInvoices() {
      try {
        const res = await this._handleRequest(
          fetch(API_URL),
          'fetchInvoices Failed'
        );
        this.invoices = await res.json();
      } catch (err) {
        // console.error('fetchInvoices Failed', err);
      }
    },

    async addInvoice(invoice) {
      try {
        await this._handleRequest(
          fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(invoice),
          }),
          'addInvoice Failed'
        );

        // Re-fetches all invoices to ensure current state matches the backend
        await this.fetchInvoices();
      } catch (err) {
        // console.error('addInvoice Error', err);
      }
    },

    async removeInvoice(id) {
      try {
        await this._handleRequest(
          fetch(`${API_URL}/${id}`, { method: 'DELETE' }),
          'removeInvoice Failed'
        );

        // Updates the local state without having to re-fetch
        this.invoices = this.invoices.filter((inv) => inv.id !== id);
      } catch (err) {
        // console.error('removeInvoice Error', err);
      }
    },

    async markAsPaid(id) {
      try {
        await this._handleRequest(
          fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              status: 'Paid',
              date_paid: new Date().toISOString(),
            }),
          }),
          'markAsPaid Failed'
        );

        // Refreshes the list to reflect updates made
        await this.fetchInvoices();
      } catch (err) {
        // console.error('markAsPaid Error', err);
      }
    },
  },

  persist: {
    paths: ['invoices'],
  },
});
