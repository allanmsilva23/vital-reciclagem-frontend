import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Cadastro from '../views/Cadastro.vue'
import TableView from '../views/TableClients.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: Cadastro
  },
  {
    path: '/tabela',
    name: 'tabela',
    component: TableView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router