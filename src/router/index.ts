import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresGuest: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();

  // Redirect to login if accessing protected route while not authenticated
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/login');
    return;
  }

  // Redirect to dashboard if accessing guest-only route while authenticated
  if (to.meta.requiresGuest && isAuthenticated.value) {
    next('/dashboard');
    return;
  }

  next();
});

export default router;
