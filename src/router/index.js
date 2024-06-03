import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'
import SignInView from '../views/SignInView.vue'
import AccountVue from '../views/AccountVue.vue'
import { useAuthStore } from '@/stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: {
        auth: false
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountVue,
      meta: {
        auth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.



      component: () => import('../views/AboutView.vue')
    }
  ]
})

//Check user 

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.auth && !authStore.userInfo.token) {
    next('/signin')
  } else if (!to.meta.auth && authStore.userInfo.token) {
    next('/account')
  } else {
    next();
  }
})

export default router
