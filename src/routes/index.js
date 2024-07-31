import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '../pages/indexPage.vue';
import MainLayout from '../layouts/mainLayout.vue';

const routes = [
  {
    path: '/',
    component: IndexPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;