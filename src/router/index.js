import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Cadastro from '../views/register/Cadastro.vue'
import CadastroAdmin from '../views/register/CadastroAdmin.vue'
import EmailPage from '../views/EmailView.vue'
import CertificatePage from '../views/CertificateView.vue'
import StockView from '../views/StockView.vue'
import ClientsView from '../views/ClientsListView.vue'
import ProductsView from '../views/ProductsView.vue'
import LoginAdmin from '../views/auth/LoginAdmin.vue'
import LoginClient from '../views/auth/LoginClient.vue'

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
    path: '/cadastro-admin',
    name: 'cadastro-admin',
    component: CadastroAdmin
  },
  {
    path: '/login',
    name: 'login',
    component: LoginClient
  },
  {
    path: '/login-admin',
    name: 'login-admin',
    component: LoginAdmin
  },
    {
    path: '/enviar-email',
    name: 'email',
    component: EmailPage
  },
  {
    path: '/criar-certificado',
    name: 'certificado',
    component: CertificatePage
  },
  {
    path: '/lista-clientes',
    name: 'lista-clientes',
    component: ClientsView
  },
  {
    path: '/lista-estoques',
    name: 'lista-estoques',
    component: StockView
  },
  {
    path: '/lista-produtos',
    name: 'lista-produtos',
    component: ProductsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router