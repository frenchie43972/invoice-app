import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';

import { useClientStore } from './stores/clientStore';

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

const clientStore = useClientStore();
window.clientStore = clientStore; // optional, makes it visible in console
// Temporary debug access for manual testing
window.pinia = pinia;

app.mount('#app');
