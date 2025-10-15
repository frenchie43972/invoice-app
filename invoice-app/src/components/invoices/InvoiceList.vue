<script setup>
import { ref, onMounted } from 'vue';
import { useInvoiceStore } from '../../stores/invoiceStore';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
import InvoiceItem from './InvoiceItem.vue';

const store = useInvoiceStore();

// Simulated loading to demo the Spinner
const loading = ref(false);

onMounted(() => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
});

// Actions
function markAsPaid(id) {
  store.markAsPaid(id);
}

function removeInvoice(id) {
  store.removeInvoice(id);
}
</script>

<template>
  <section class="invoice-list">
    <h2>Invoices</h2>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <BaseSpinner size="64px" />
    </div>

    <!-- Empty List State -->
    <p v-else-if="store.invoices.length === 0" class="empty">
      No Invoices Available.
    </p>

    <!-- List of Invoices -->
    <ul v-else class="invoices">
      <InvoiceItem
        v-for="invoice in store.invoices"
        :key="invoice.id"
        :invoice="invoice"
        @markAsPaid="markAsPaid"
        @removeInvoice="removeInvoice"
      />
    </ul>
  </section>
</template>

<style scoped>
.invoice-list {
  padding: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.loading-container {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.invoices {
  list-style: none;
  padding: 0;
  margin: 0;
}

.invoice-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.details p {
  margin: 0.25rem 0;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

button {
  background: #3b3687;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button.danger {
  background: #dc2626;
}

button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.empty {
  text-align: center;
  color: #6b7280;
  font-style: italic;
  margin-top: 2rem;
}
</style>
