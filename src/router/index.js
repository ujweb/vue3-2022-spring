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
      path: 'product/:id',
      component: () => import('../views/ProductView.vue'),
    },
    {
      path: 'cart',
      component: () => import('../views/CartView.vue'),
    }],
  },
  // 登入頁
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
    },
    {
      path: 'orders',
      component: () => import('../views/AdminOrders.vue'),
    },
    {
      path: 'coupons',
      component: () => import('../views/AdminCoupons.vue'),
    },
    {
      path: 'articles',
      component: () => import('../views/AdminArticles.vue'),
    },
    {
      path: 'article',
      component: () => import('../views/AdminArticle.vue'),
    }],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
