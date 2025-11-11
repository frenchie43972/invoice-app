<script setup>
import { ref, onMounted } from 'vue';
import { useInvoiceStore } from '../../stores/invoiceStore';
import { useLoading } from '../../composables/useLoading';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
import InvoiceItem from './InvoiceItem.vue';

const store = useInvoiceStore();
const { loading, withLoading } = useLoading();

onMounted(async () => {
  await store.fetchInvoices();
});

// Actions
async function markAsPaid(id) {
  await withLoading(async () => {
    await store.markAsPaid(id);
  });
}

async function removeInvoice(id) {
  await withLoading(async () => {
    store.removeInvoice(id);
  });
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
.invoices {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Empty state text */
.empty {
  text-align: center;
  color: #6b7280;
  font-style: italic;
  margin-top: 2rem;
}
</style>
