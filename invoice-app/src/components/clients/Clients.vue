<script setup>
import BaseButton from '../ui/BaseButton.vue';
import BaseCard from '../ui/BaseCard.vue';

// Props - each client that passes from ClientList
const props = defineProps({
  client: {
    type: Object,
    required: true,
  },
});

// Emits - sneds actions back to ClientList.vue
const emit = defineEmits(['editClient', 'removeClient']);

function handleEdit() {
  emit('editClient', props.client);
}

function handleRemove() {
  emit('removeClient', props.client);
}
</script>

<template>
  <li class="client-item" role="listitem">
    <BaseCard>
      <div class="details">
        <h3>{{ client.name }}</h3>
        <p v-if="client.phone">Phone: {{ client.phone }}</p>
        <p>Email: {{ client.email }}</p>
        <p v-if="client.phone">{{ client.phone }}</p>
        <p>
          Status:
          <strong :class="client.is_active ? 'active' : 'inactive'">
            {{ client.is_active ? 'Active' : 'Inactive' }}
          </strong>
        </p>
      </div>

      <div class="actions">
        <BaseButton
          variant="primary"
          size="sm"
          aria-label="Edit Client"
          @click="handleEdit"
        >
          Edit
        </BaseButton>

        <BaseButton
          variant="danger"
          size="sm"
          aria-label="Remove Client"
          @click="handleRemove"
        >
          Edit
        </BaseButton>
      </div>
    </BaseCard>
  </li>
</template>

<style scoped>
.client-item {
  list-style: none;
  margin-bottom: 1rem;
}

.details {
  margin-bottom: 0.75rem;
}

.details p {
  margin: 0.25rem 0;
}

.active {
  color: #16a34a; /* green-600 */
}

.inactive {
  color: #dc2626; /* red-600 */
}

.actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
