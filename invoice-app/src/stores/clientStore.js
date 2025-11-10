import { defineStore } from 'pinia';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/clients`;

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: [],
    loading: false,
    error: null,
  }),

  getters: {
    activeClients: (state) => state.clients.filter((c) => c.is_active !== 0),
    totalClients: (state) => state.clients.length,
  },
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

    // Fetch all clients from the backend
    async fetchClients() {
      try {
        const res = await this._handleRequest(
          fetch(API_URL),
          'fetchClients Failed'
        );
        this.clients = await res.json();
      } catch (err) {
        // _handleRequest provides the error message
      }
    },

    // Adds a new client and then refreshes the list of clients
    async addClient(client) {
      try {
        await this._handleRequest(
          fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(client),
          }),
          'addClient Failed'
        );

        // Refreshes the state to reflect the new data
        await this.fetchClients();
      } catch (err) {}
    },

    // Update the existing client by ID
    async updateClient(id, updateData) {
      try {
        await this._handleRequest(
          fetch(`{API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData),
          }),
          'updateClient Failed'
        );

        // Will re-fetch the clients to reflect updates
        await this.fetchClients();
      } catch (error) {}
    },

    // Deletes the client by ID
    async removeClient(id) {
      try {
        await this._handleRequest(
          fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
          })
        );

        // Updates the local state so no refresh needed
        this.clients = this.clients.filter((c) => c.id !== id);
      } catch (error) {}
    },

    persist: {
      paths: ['clients'],
    },
  },
});
