import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import ClientsView from '../views/ClientsView.vue';
import InvoicesView from '../views/InvoicesView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import ReportsView from '../views/ReportsView.vue';
import SettingsView from '../views/SettingsView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/clients', name: 'clients', component: ClientsView },
  { path: '/invoices', name: 'invoices', component: InvoicesView },
  { path: '/:pathMatch(.*)', name: 'not-found', component: NotFoundView },
  { path: '/reports', name: 'reports', component: ReportsView },
  { path: '/settings', name: 'settings', component: SettingsView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
