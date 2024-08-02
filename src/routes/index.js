import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '../pages/indexPage.vue';
import MainLayout from '../layouts/mainLayout.vue';

const routes = [
  {
    path: '/',
    component: IndexPage,
  },
  {
    path: '/bienvenido',
    name: 'Bienvenido',
    component: MainLayout,
  },
  {
    path: '/nuevaTienda',
    name: 'Nueva Tienda',
    component: MainLayout,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;