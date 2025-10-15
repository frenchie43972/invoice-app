<script setup>
import { defineEmits, defineProps } from 'vue';

// Recieves invoice data from InvoiceList
const props = defineProps({
  invoice: {
    type: Object,
    required: true,
  },
});

// Emits events to send back to InvoiceList
const emit = defineEmits(['markPaid', 'removeInvoice']);

// Trigger actions in InvoiceList
function handleMarkPaid() {
  emit('markPaid', props.invoice.id);
}

function handleRemove() {
  emit('removeInvoice', props.invoice.id);
}
</script>

<template>
  <li class="invoice-item">
    <div class="details">
      <h3>
        {{ invoice.client }}
      </h3>
      <p>Amount: ${{ invoice.amount }}</p>
      <p>
        Status: <strong>{{ invoice.status }}</strong>
      </p>
      <p>Due: {{ invoice.dueDate }}</p>
      <p v-if="invoice.datePatid">Paind on: {{ invoice.datePaid }}</p>
    </div>

    <div class="actions">
      <button
        @click="
          handleMarkPaid;
          console.log('clicked');
        "
        :disabled="props.invoice.status === 'Paid'"
      >
        Mark Paid
      </button>
      <button @click="handleRemove" class="danger">Remove</button>
    </div>
  </li>
</template>

<style scoped>
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
</style>
