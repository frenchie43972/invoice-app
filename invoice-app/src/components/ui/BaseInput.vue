<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  modelValue: { type: [String, Number, Date], default: '' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
});

// Emits the update to the parent
const emit = defineEmits(['update:modelValue']);

// Computed input classes
const inputClasses = computed(() => ({
  'has-error': !!props.error,
}));
</script>

<template>
  <div class="base-input">
    <label for="id">{{ label }}</label>

    <input
      v-bind="$attrs"
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      @input="emit('update:modelValue', $event.target.value)"
    />

    <small v-if="error" class="error">{{ error }}</small>
  </div>
</template>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label {
  font-weight: 600;
  color: #374151;
}

input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
  border-color: #3b3687;
  box-shadow: 0 0 0 2px rgba(59, 54, 135, 0.2);
}

input.has-error {
  border-color: #dc2626;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.1);
}

.error {
  color: #dc2626;
  font-size: 0.875rem;
}
</style>
