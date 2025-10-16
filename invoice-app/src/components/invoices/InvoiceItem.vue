<script setup>
import BaseButton from '../ui/BaseButton.vue';

// Recieves invoice data from InvoiceList
const props = defineProps({
  invoice: {
    type: Object,
    required: true,
  },
});

// Emits events to send back to InvoiceList
const emit = defineEmits(['markAsPaid', 'removeInvoice']);

// Trigger actions in InvoiceList
function handleMarkPaid() {
  console.log('InvoiceItem => emit markPaid');
  emit('markAsPaid', props.invoice.id);
}

function handleRemove() {
  console.log('InvoiceItem => emit removeInvoice');
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
      <BaseButton
        variant="primary"
        size="sm"
        :disabled="invoice.status === 'Paid'"
        aria-label="Mark invoice as paid"
        @click="handleMarkPaid"
      >
        Mark Paid
      </BaseButton>
      <BaseButton
        variant="danger"
        size="sm"
        aria-label="Remove this invoice"
        @click="handleRemove"
      >
        Remove
      </BaseButton>

      <BaseButton @click="console.log('clicked basebutton')">Test</BaseButton>
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
</style>
