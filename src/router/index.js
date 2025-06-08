import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Cadastro from '../views/Cadastro.vue'
import Login from '../views/Login.vue'
import PageTest from '../views/PageTest.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/test',
    name: 'test',
    component: PageTest
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: Cadastro
  },
    {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router