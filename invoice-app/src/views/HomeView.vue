<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';

import { useInvoiceStore } from '../stores/invoiceStore';

import BaseCard from '../components/ui/BaseCard.vue';
import BaseButton from '../components/ui/BaseButton.vue';

import ClientForm from '../components/clients/ClientForm.vue';

const router = useRouter();

const store = useInvoiceStore();

const totalInvoices = computed(() => store.invoices.length);

const paidInvoices = computed(
  () => store.invoices.filter((i) => i.status.toLowerCase() === 'paid').length
);

const unpaidInvoices = computed(
  () => store.invoices.filter((i) => i.status.toLowerCase() === 'unpaid').length
);

function goToRoute(routeName) {
  router.push({ name: routeName });
}
</script>

<template>
  <section class="home-section routes">
    <ClientForm />
    <hr />
    <h2>Quick Actions (replace with a better title)</h2>
    <nav class="route-buttons">
      <BaseButton
        class="button"
        variant="primary"
        size="lg"
        aria-label="Create Invoice"
        @click="goToRoute('invoices')"
      >
        Create Invoice
      </BaseButton>
      <BaseButton
        class="button"
        variant="primary"
        size="lg"
        aria-label="View Clients"
        @click="goToRoute('clients')"
      >
        View Clients
      </BaseButton>
      <BaseButton
        class="button"
        variant="primary"
        size="lg"
        aria-label="Create Reports"
        @click="goToRoute('reports')"
      >
        Create Reports
      </BaseButton>
      <BaseButton
        class="button"
        variant="primary"
        size="lg"
        aria-label="View Settings"
        @click="goToRoute('settings')"
      >
        View Settings
      </BaseButton>
    </nav>
  </section>
  <hr />
  <section class="home-section dashboard-section">
    <div class="dashboard-cards">
      <BaseCard class="dashboard-card">
        <h3>Total Invoices</h3>
        <p>{{ totalInvoices }}</p>
      </BaseCard>
      <BaseCard class="dashboard-card">
        <h3>Paid Invoices</h3>
        <p>{{ paidInvoices }}</p>
      </BaseCard>
      <BaseCard class="dashboard-card">
        <h3>Unpaid Invoices</h3>
        <p>{{ unpaidInvoices }}</p>
      </BaseCard>
    </div>
  </section>
</template>

<style scoped>
hr {
  max-width: 1200px;
}
.home-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.route-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin: 20px 0;
}

.button {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.dashboard-section {
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

.dashboard-card {
  padding: 1.5rem;
  text-align: center;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: #e3f4f4; /* ensure visible contrast */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}

.dashboard-card h3 {
  color: #3b3687;
  margin-bottom: 0.5rem;
}

.dashboard-card p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2b2b2b;
}
</style>
