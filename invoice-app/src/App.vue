<script setup>
import { useInvoiceStore } from './stores/invoiceStore';

const store = useInvoiceStore();

function addTestInvoice() {
  store.addInvoice({
    client: 'New Client',
    amount: 500,
    dueDate: '2025-10-25',
    status: 'Unpaid',
  });
}
</script>

<template>
  <div>
    <h1>Welcome, Everyting is Fine!</h1>
    <button @click="addTestInvoice">Add test Invoice</button>
    <ul>
      <li v-for="invoice in store.invoices" :key="invoice.id">
        <strong>{{ invoice.client }}</strong> - ${{ invoice.amount }} -
        {{ invoice.status }}
        <button @click="store.markAsPaid(invoice.id)">Mark Paid</button>
        <button @click="store.removeInvoice(invoice.id)">Remove</button>
      </li>
    </ul>

    <p>Total Invoics: {{ store.totalInvoices }}</p>
  </div>
</template>

<style scoped></style>
