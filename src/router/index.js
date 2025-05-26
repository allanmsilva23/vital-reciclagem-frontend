import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory('/vital-reciclagem-frontend/'),
  routes,
});

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  }
]

export default router