import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Cadastro from '../views/Cadastro.vue'
import Login from '../views/Login.vue'
import Usuarios from '../views/UsuariosView.vue'
import Estoque from '../views/EstoqueView.vue'

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
    path: '/login',
    name: 'login',
    component: Login
  },
  // Novas rotas:
  {
    path: '/usuarios',
    name: 'usuarios',
    component: Usuarios
  },
  {
    path: '/estoque',
    name: 'estoque',
    component: Estoque
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router