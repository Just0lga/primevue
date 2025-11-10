import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginView },
  { path: '/about', name: 'About', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router