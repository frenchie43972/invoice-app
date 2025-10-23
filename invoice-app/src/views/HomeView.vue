<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useInvoiceStore } from '../stores/invoiceStore';
import BaseCard from '../components/ui/BaseCard.vue';
import BaseButton from '../components/ui/BaseButton.vue';

const router = useRouter();
</script>

<template>
  <h1>Hi There!</h1>
</template>

<style scoped></style>
