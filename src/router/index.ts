import { createRouter, createWebHistory } from 'vue-router';
// import { useAuthStore } from '@/stores';


// const authStore = useAuthStore();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import ('../views/SignIn.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      },
      component: () => import('../views/DashboardView.vue'),
      children: [
        {
          path: 'employees',
          name: 'employees',
          meta: {
            requiresAuth: true,
          },
          component: () => import('../components/EmployeesComponent.vue'),
        },
        {
          path: 'recruitment',
          name: 'recruitment',
          meta: {
            requiresAuth: true,
          },
          component: () => import('../components/RecuitmentComponent.vue'),
        },
      ],
    },
    
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});
export default router
