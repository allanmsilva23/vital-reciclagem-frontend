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
import AccessDenied from '../views/errors/404.vue'
import ClientsListView from '../views/ClientsListView.vue'

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
    component: EmailPage,
    meta: { requiresAuth: true, role: 'admin' } 
  },
  {
    path: '/criar-certificado',
    name: 'certificado',
    component: CertificatePage,
    meta: { requiresAuth: true, role: 'admin' } 
  },
  {
    path: '/lista-clientes',
    name: 'lista-clientes',
    component: ClientsListView,
    meta: { requiresAuth: true, role: 'admin' } 
  },
  {
    path: '/lista-estoques',
    name: 'lista-estoques',
    component: StockView,
    meta: { requiresAuth: true, role: 'admin' } 
  },
  {
    path: '/lista-produtos',
    name: 'lista-produtos',
    component: ProductsView,
    meta: { requiresAuth: true, role: 'admin' } 
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDenied
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/errors/404.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const requiredRole = to.meta.role;
  const requiredLevel = to.meta.level; 

  const accessToken = localStorage.getItem('access_token');
  const userRole = localStorage.getItem('user_role'); 
  const userLevel = localStorage.getItem('user_level');

  if (to.name === 'login' || to.name === 'login-admin' || to.name === 'cadastro' || to.name === 'cadastro-admin') {
    next();
    return;
  }
  
  if (requiresAuth) {
    if (!accessToken) {
      console.warn('Nenhum token encontrado.');
      next('/access-denied');
    } else {
      if (requiredRole && userRole !== requiredRole) {
        console.warn(`Acesso negado: Requer role '${requiredRole}', mas o usuário é '${userRole}'`);
        next('/access-denied'); 
      } else if (requiredRole === 'admin' && requiredLevel) {
        const adminLevels = { 'Junior': 3, 'Pleno': 2, 'Master': 1 }; 
        const userLevelValue = adminLevels[userLevel];
        const requiredLevelValue = adminLevels[requiredLevel];

        if (userLevelValue > requiredLevelValue) { 
          console.warn(`Acesso negado: Requer nível '${requiredLevel}', mas o admin é '${userLevel}'`);
          next('/access-denied'); 
        } else {
          next(); 
        }
      } else {
        next();
      }
    }
  } else {
    next(); 
  }
});

export default router