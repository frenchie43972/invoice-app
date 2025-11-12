<script setup>
import { ref, onMounted } from 'vue';
import { useClientStore } from '../../stores/clientStore';
import { useLoading } from '../../composables/useLoading';
import BaseSpinner from '../ui/BaseSpinner.vue';
import Client from './Clients.vue';

const store = useClientStore();
const { loading, withLoading } = useLoading();

// Loads all clients on mount
onMounted(async () => {
  await store.fetchClients();
});

// Handlers Section - Remove Client and Edit Clients (Add more later if needed)
async function removeClient(id) {
  await withLoading(async () => {
    await store.removeClient(id);
  });
}

// Stubbed to implement later
async function editClient(client) {
  // await withLoading(async () => {
  //   await store.updateClient(client.id, client);
  // });

  console.log('Edit client not implemented yet.', client);
}
</script>

<template>
  <section class="client-list">
    <h2>Clients (Rename later)</h2>

    <!-- If Clients are loading the spinner component activates -->
    <div v-if="loading" class="loading-spinner">
      <BaseSpinner size="64px" />
    </div>

    <!-- If there are no clients in the list -->
    <p v-else-if="store.clients.length === 0" class="empty">
      No Clients Available
    </p>

    <!-- The Client List -->
    <ul v-else="" class="clients">
      <Client
        v-for="client in store.clients"
        :key="client.id"
        :client="client"
        @editClient="editClient"
        @removeClient="removeClient"
      />
    </ul>
  </section>
</template>

<style scoped>
.client-list {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Spinner alignment */
.loading-container {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

/* Responsive grid layout */
.clients {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Empty state */
.empty {
  text-align: center;
  color: #6b7280;
  font-style: italic;
  margin-top: 2rem;
}
</style>
