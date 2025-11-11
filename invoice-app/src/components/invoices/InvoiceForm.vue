<script setup>
import { ref } from 'vue';
import BaseButton from '../ui/BaseButton.vue';
import BaseCard from '../ui/BaseCard.vue';
import BaseInput from '../ui/BaseInput.vue';
import BaseSelect from '../ui/BaseSelect.vue';
import { useInvoiceStore } from '../../stores/invoiceStore';
import { useLoading } from '../../composables/useLoading';

// Emits
const emit = defineEmits(['submitted']);

// Limits the date selection to today or later (cannot back date)
const today = new Date().toISOString().split('T')[0];

// State and dependencies
const store = useInvoiceStore();
const { loading, withLoading } = useLoading();

// Reactive for data
const invoiceForm = ref({
  client_id: '',
  amount: '',
  dueDate: '',
});

// Temp Clients
const clients = [
  { value: 1, label: 'Acme Corporation' },
  { value: 2, label: 'Beta Industries' },
  { value: 3, label: 'Gamma Solutions' },
];

// Validation errors
const errors = ref({});

function validate() {
  const errs = {};
  if (!invoiceForm.value.client_id.trim())
    errs.client_id = 'Client name is required.';
  if (!invoiceForm.value.amount || isNaN(invoiceForm.value.amount))
    errs.amount = 'Amount must be a number.';
  if (!invoiceForm.value.dueDate) errs.dueDate = 'Due date is required.';
  errors.value = errs;
  return Object.keys(errs).length === 0;
}

async function handleSubmit() {
  if (!validate()) return;

  await withLoading(async () => {
    store.addInvoice({
      client: invoiceForm.value.client_id,
      amount: Number(invoiceForm.value.amount),
      dueDate: invoiceForm.value.dueDate,
      status: 'Unpaid',
      datePaid: null,
    });

    // Resets the invoiceForm
    invoiceForm.value = { client: '', amount: '', dueDate: '' };
    emit('submitted');
  });
}
</script>

<template>
  <BaseCard elevated>
    <form class="invoice-form" @submit.prevent="handleSubmit">
      <h3>Add Invoice</h3>

      <BaseSelect
        id="client"
        label="Client"
        :options="clients"
        v-model="invoiceForm.client_id"
        :error="errors.client_id"
      />

      <BaseInput
        id="amount"
        label="Amount"
        type="number"
        v-model="invoiceForm.amount"
        placeholder="e.g 1200"
        :disabled="loading"
        :error="errors.amount"
      />

      <BaseInput
        id="dueDate"
        label="Due Date"
        type="date"
        v-model="invoiceForm.dueDate"
        :min="today"
        :disabled="loading"
        :error="errors.dueDate"
      />

      <BaseButton
        variant="primary"
        size="md"
        type="submit"
        :disabled="loading"
        aria-label="Add invoice"
      >
        <span v-if="!loading">Add Invoice</span>
        <span v-else>Saving...</span>
      </BaseButton>
    </form>
  </BaseCard>
</template>

<style scoped>
.invoice-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

button {
  align-self: flex-start;
}
</style>
