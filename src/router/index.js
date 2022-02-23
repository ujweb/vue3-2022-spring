import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [{
      path: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: 'products',
      component: () => import('../views/ProductsView.vue'),
    },
    {
      path: 'cart',
      component: () => import('../views/CartView.vue'),
    }],
  },
  // 後台
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
  },
  // 後台
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [{
      path: 'products',
      component: () => import('../views/AdminProducts.vue'),
    }],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
