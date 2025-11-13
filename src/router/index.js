import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LoginView2 from '../views/LoginView2.vue'
import AboutView from '../views/AboutView.vue'
import AboutView2 from '../views/AboutView2.vue'


const routes = [
  { path: '/', name: 'Login', component: LoginView },
  { path: '/login2', name: 'Login2', component: LoginView2 },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/about2', name: 'About2', component: AboutView2 },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router