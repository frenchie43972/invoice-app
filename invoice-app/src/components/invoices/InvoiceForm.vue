<script setup>
import { ref } from 'vue';
import BaseButton from '../ui/BaseButton.vue';
import BaseCard from '../ui/BaseCard.vue';
// import BaseInput from '../ui/BaseInput.vue';
import { useInvoiceStore } from '../../stores/invoiceStore';
import { useLoading } from '../../composables/useLoading';

// Emits
const emit = defineEmits(['submitted']);

// State and dependencies
const store = useInvoiceStore();
const { loading, withLoading } = useLoading();

// Reactive for data
const form = ref({
  client: '',
  amount: '',
  dueDate: '',
});

// Validation errors
const errors = ref({});

function validate() {
  const errs = {};
  if (!form.value.client.trim()) errs.client = 'Client name is required.';
  if (!form.value.amount || isNaN(form.value.amount))
    errs.amount = 'Amount must be a number.';
  if (!form.value.dueDate) errs.dueDate = 'Due date is required.';
  errors.value = errs;
  return Object.keys(errs).length === 0;
}

async function handleSubmit() {
  if (!validate()) return;

  await withLoading(async () => {
    store.addInvoice({
      client: form.value.client,
      amount: Number(form.value.amount),
      dueDate: form.value.dueDate,
      status: 'Unpaid',
      datePaid: null,
    });

    // Resets the form
    form.value = { client: '', amount: '', dueDate: '' };
    emit('submitted');
  });
}
</script>

<template>
  <BaseCard elevated>
    <form class="invoice-form" @submit.prevent="handleSubmit">
      <h3>Add Invoice</h3>

      <div class="field">
        <label for="client">Client</label>
        <input
          type="text"
          id="client"
          v-model="form.client"
          :disabled="loading"
          placeholder="placeholder text"
        />
        <small v-if="errors.client" class="error">{{ errors.client }}</small>
      </div>

      <div class="field">
        <label for="amount">Amount ($)</label>
        <input
          type="text"
          id="amount"
          v-model="form.amount"
          :disabled="loading"
          placeholder="placeholder amount"
        />
        <small v-if="errors.amount" class="error">{{ errors.amount }}</small>
      </div>

      <div class="field">
        <label for="dueDate">Due Date</label>
        <input
          type="text"
          id="dueDate"
          v-model="form.dueDate"
          :disabled="loading"
        />
        <small v-if="errors.dueDate" class="error">{{ errors.dueDate }}</small>
      </div>

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

.field {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
}

input:focus {
  border-color: #3b3687;
  box-shadow: 0 0 0 2px rgba(59, 54, 135, 0.2);
}

.error {
  color: #dc2626;
  font-size: 0.875rem;
}

button {
  align-self: flex-start;
}
</style>
