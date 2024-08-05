import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '../pages/indexPage.vue';
import MainLayout from '../layouts/mainLayout.vue';
import Loading from '../pages/loading.vue'

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
  },
  {
    path: '/gestionarTienda/:id',
    name: 'Gestionar Tienda',
    component: MainLayout,
  },
  {
    path: '/configurarProductos/:id',
    name: 'Configurar Productos',
    component: MainLayout,
  },
  {
    path: '/gestionBeneficios/:id',
    name: 'Gestion de beneficios',
    component: MainLayout,
  },
  {
    path: '/historico/:id',
    name: 'Historico',
    component: MainLayout,
  },
  {
    path: '/resultadoshistorico/:id',
    name: 'Resultados Historico',
    component: MainLayout,
  },
  {
    path: '/cargando/:id',
    name: 'Cargando',
    component: Loading,
  },
  {
    path: '/resultados/:id',
    name: 'Resultados',
    component: MainLayout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;