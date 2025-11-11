<script setup>
import { ref } from 'vue';

import { useClientStore } from '../../stores/clientStore.js';
import { useLoading } from '../../composables/useLoading';

import BaseButton from '../ui/BaseButton.vue';
import BaseCard from '../ui/BaseCard.vue';
import BaseInput from '../ui/BaseInput.vue';

const emit = defineEmits(['submitted']);

const store = useClientStore();
const { loading, withLoading } = useLoading();

const clientForm = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  is_active: 1,
});

const errors = ref({});

function validate() {
  const errs = {};

  if (!clientForm.value.name.trim()) errs.name = 'Client name is required';
  if (!clientForm.value.email.trim()) errs.email = 'Email address is required';
  else if (!/^[^\s@]+@[^s@]+\.[^\s@]+$/.test(clientForm.value.email))
    errs.email = 'Enter a valid email address';
  if (
    clientForm.value.phone &&
    !/^\+?[0-9\s\-()]{7,20}$/.test(clientForm.value.phone)
  )
    errs.phone = 'Enter a valid phone number.';

  if (!clientForm.value.company.trim())
    errs.company = 'Company name is required';
  errors.value = errs;
  return Object.keys(errs).length === 0;
}

async function handleSubmit() {
  if (!validate()) return;

  await withLoading(async () => {
    await store.addClient({ ...clientForm.value });

    clientForm.value = {
      name: '',
      email: '',
      phone: '',
      company: '',
      is_active: 1,
    };

    emit('submitted');
  });
}
</script>

<template>
  <BaseCard elevated>
    <form class="client-form" @submit.prevent="handleSubmit">
      <h3>Add Client</h3>

      <BaseInput
        id="name"
        label="Name"
        v-model="clientForm.name"
        :error="errors.name"
        placeholder="Client full name"
        :disabled="loading"
      />

      <BaseInput
        id="email"
        label="Email"
        v-model="clientForm.email"
        :error="errors.email"
        placeholder="email@example.com"
        :disabled="loading"
      />

      <BaseInput
        id="phone"
        label="Phone"
        v-model="clientForm.phone"
        :error="errors.phone"
        placeholder="555-123-4567"
        :disabled="loading"
      />

      <BaseInput
        id="company"
        label="Company"
        v-model="clientForm.company"
        :error="errors.company"
        placeholder="Company name"
        :disabled="loading"
      />

      <BaseButton type="submit" variant="primary" size="md" :disabled="loading">
        <span v-if="!loading">Add Client</span>
        <span v-else>Saving...</span>
      </BaseButton>
    </form>
  </BaseCard>
</template>

<style scoped>
.client-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h3 {
  margin-bottom: 0.5rem;
  color: #3b3687;
}
</style>
