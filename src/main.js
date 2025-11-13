import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';

// Tema presetlerini import et
import Aura from '@primevue/themes/aura'; // Light tema örneği

// PrimeIcons
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura, // Light tema
    options: {
      prefix: 'p',
      darkModeSelector: false, // Dark mod kullanmayacağız
      cssLayer: false
    }
  }
});

app.mount('#app');
