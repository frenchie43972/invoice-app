<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
  block: {
    type: Boolean,
    default: false,
  },
  ariaLabel: {
    type: String,
    default: '',
  },
});

// Determines the CSS class dynamically (if CSS gets updated, update this function)
const buttonClasses = computed(() => [
  'base-button',
  `variant-${props.variant}`,
  `size-${props.size}`,
  { 'is-block': props.block },
]);
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    :aria-label="ariaLabel || undefined"
    :aria-disabled="disabled ? 'true' : 'false'"
  >
    <slot />
  </button>
</template>

<style>
/* --- Base Layout --- */
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  font-family: inherit;
}

/* --- Variants --- */
.variant-primary {
  background-color: #3b3687;
  color: #fff;
}
.variant-primary:hover:not(:disabled) {
  background-color: #2e2a6d;
}

.variant-secondary {
  background-color: #52df88;
  color: #111827;
}
.variant-secondary:hover:not(:disabled) {
  background-color: #58c281;
}

.variant-danger {
  background-color: #dc2626;
  color: #fff;
}
.variant-danger:hover:not(:disabled) {
  background-color: #b91c1c;
}

/* --- Sizes --- */
.size-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
}
.size-md {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
.size-lg {
  padding: 0.75rem 1.25rem;
  font-size: 1.125rem;
}

/* --- Block --- */
.is-block {
  width: 100%;
}

/* --- Disabled --- */
.base-button:disabled,
.base-button[aria-disabled='true'] {
  background-color: #9ca3af;
  color: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.75;
}

/* --- Focus (Keyboard Accessibility) --- */
.base-button:focus-visible {
  outline: 3px solid #6366f1; /* Accessible focus ring */
  outline-offset: 2px;
}

/* --- Motion preference --- */
@media (prefers-reduced-motion: reduce) {
  .base-button {
    transition: none;
  }
}
</style>
