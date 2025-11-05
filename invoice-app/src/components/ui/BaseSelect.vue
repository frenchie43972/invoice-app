<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: [String, Number, Date], default: '' },
  placeholder: { type: String, default: 'Select a Copmpany...' },
  options: {
    type: Array,
    required: true,
    // Expected shape: [{value: 1, label: 'Acme Corp'}]
  },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
});

// Emits the update to the parent
const emit = defineEmits(['update:modelValue']);

// Computed input classes
const selectClasses = computed(() => ({
  'has-error': !!props.error,
}));
</script>

<template>
  <div class="base-select">
    <label for="id">{{ label }}</label>

    <select
      :id="id"
      :value="modelValue"
      :disabled="disabled"
      :class="selectClasses"
      @change="emit('update:modelValue', $event.target.value)"
    >
      <option disabled value="">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <small v-if="error" class="error">{{ error }}</small>
  </div>
</template>

<style scoped>
.base-select {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label {
  font-weight: 600;
  color: #374151;
}

select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

select:focus {
  border-color: #3b3687;
  box-shadow: 0 0 0 2px rgba(59, 54, 135, 0.2);
}

select.has-error {
  border-color: #dc2626;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.1);
}

.error {
  color: #dc2626;
  font-size: 0.875rem;
}
</style>
