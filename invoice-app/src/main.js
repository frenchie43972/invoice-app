import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

App.use(pinia);
createApp(App).mount('#app');
