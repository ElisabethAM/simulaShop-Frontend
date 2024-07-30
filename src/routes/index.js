import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld
  },
  // Agrega más rutas aquí
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;