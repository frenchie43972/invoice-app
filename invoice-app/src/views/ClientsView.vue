<script setup>
import { useRouter } from 'vue-router';
import ClientList from '../components/clients/ClientList.vue';
import BaseButton from '../components/ui/BaseButton.vue';

const router = useRouter();

function goToRoute(routeName) {
  router.push({ name: routeName });
}
</script>

<template>
  <h1>Client View</h1>
  <ClientList />
  <hr />
  <BaseButton
    class="button"
    variant="secondary"
    size="sm"
    aria-label="Create Invoice"
    @click="goToRoute('home')"
  >
    Home
  </BaseButton>
</template>

<style scoped>
hr {
  margin-bottom: 20px;
}
</style>
