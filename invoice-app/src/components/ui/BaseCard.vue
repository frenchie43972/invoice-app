<script setup>
defineProps({
  clickable: { type: Boolean, default: false },
  elevated: { type: Boolean, default: true },
});
</script>

<template>
  <div
    class="base-card"
    :class="{ clickable, elevated }"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    @click="$emit('click')"
  >
    <slot />
  </div>
</template>

<style scoped>
.base-card {
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.25rem;
  border: 1px solid #e5e7eb;
  transition: box-shadow 0.2s ease, transform 0.1s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px; /* consistent height */
}

.base-card.elevated {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.base-card.clickable:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>
