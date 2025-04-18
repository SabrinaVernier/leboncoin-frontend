import { createRouter, createWebHistory } from 'vue-router'
import { inject } from 'vue'

import HomeView from '../views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import PaymentView from '@/views/PaymentView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: (route) => {
        return {
          page: parseInt(route.query.page) || 1,
          title: route.query.title || '',
          sort: route.query.sort || '',
          minprice: Number(route.query.minprice) || '',
          maxprice: Number(route.query.maxprice) || '',
        }
      },
    },
    {
      path: '/offer/:id',
      name: 'offerView',
      component: () => import('../views/OfferView.vue'),
      props: true,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('../views/PublishView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/payment/:id',
      name: 'payment',
      component: PaymentView,
      props: true,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/:catchAll(.*)',
      name: 'notfound',
      component: NotFoundView,
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})

// ----navigation Guards------
// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from) => {
  const globalStore = inject('GlobalStore')
  if (to.meta.requireAuth && globalStore.connectedUser.value.length === 0) {
    return { name: 'login', query: { redirect: to.path } }
  }
})

export default router
