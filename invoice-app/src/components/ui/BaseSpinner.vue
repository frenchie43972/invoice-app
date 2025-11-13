<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: '48px', // Default Spinner Size
  },
  color: {
    type: String,
    default: '#3b3687', // Default Spinner Color
  },
  speed: {
    type: String,
    default: '1s', // Animation Speed
  },
});

const spinnerStyle = computed(() => ({
  width: props.size,
  height: props.size,
  // Prevents fractional borders which can look blurry on on some screens
  border: `${Math.round(parseInt(props.size) / 8)}px solid rgba(0, 0, 0, 0.1)`,
  borderTopColor: props.color,
  animation: `spin ${props.speed} linear infinite`,
}));
</script>

<template>
  <div
    class="spinner"
    :style="spinnerStyle"
    role="status"
    aria-label="Loading"
  ></div>
</template>

<style>
.spinner {
  border-radius: 50%;
  display: inline-block;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
