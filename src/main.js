// main.js - PrimeVue v4 için DOĞRU kurulum

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// ✅ Sadece PrimeIcons CSS'ini import edin
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(router)

// ✅ PrimeVue v4 konfigürasyonu
app.use(PrimeVue, {
  theme: {
    preset: Aura,  // Varsayılan tema
    options: {
      darkModeSelector: '.dark-mode',  // Dark mode için class
      cssLayer: false
    }
  }
})

app.mount('#app')