<script setup>
import BaseButton from '../ui/BaseButton.vue';
import BaseCard from '../ui/BaseCard.vue';

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
  emit('markAsPaid', props.invoice.id);
}

function handleRemove() {
  emit('removeInvoice', props.invoice.id);
}
</script>

<template>
  <li class="invoice-item" role="listitem">
    <BaseCard>
      <div class="details">
        <h3>
          {{ invoice.client }}
        </h3>
        <p>Amount: ${{ (invoice.amount_cents / 100).toFixed(2) }}</p>
        <p>
          Status: <strong>{{ invoice.status }}</strong>
        </p>
        <p>Due: {{ invoice.dueDate }}</p>
        <p v-if="invoice.datePaid">Paid on: {{ invoice.datePaid }}</p>
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
      </div>
    </BaseCard>
  </li>
</template>

<style scoped>
.invoice-item {
  list-style: none;
  margin-bottom: 1rem;
}

.details {
  margin-bottom: 0.75rem;
}

.details p {
  margin: 0.25rem 0;
}

.client {
  margin-bottom: 0.5rem;
  color: #3b3687;
}

.actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
