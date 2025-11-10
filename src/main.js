import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Birazdan oluşturacağız
import PrimeVue from 'primevue/config'

// PrimeVue teması ve ikonları
import '@primevue/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'

// Kullandığınız bileşenlerin CSS dosyaları
// Bunlar olmadan bileşenler düzgün görünmez
import 'primevue/button.css'
import 'primevue/inputtext.css'
import 'primevue/password.css'
import 'primevue/card.css'
import 'primevue/sidebar.css'
import 'primevue/panelmenu.css'
import 'primevue/dropdown.css'

const app = createApp(App)

app.use(router) // Router'ı kullan
app.use(PrimeVue) // PrimeVue'yu kullan

app.mount('#app')