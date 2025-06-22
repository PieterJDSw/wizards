import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HousesView from '../views/HousesView.vue'
import { useUserStore } from '@/stores/userStore'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/houses',
    name: 'houses',
    component: HousesView,
  },
  {
    path: '/spells',
    name: 'spells',
    component: () => import('../views/SpellsView.vue'),
  },
  {
    path: '/spells/:id',
    name: 'spell-details',
    component: () => import('../views/SpellDetailsView.vue'),
  },
  {
    path: '/elixirs',
    name: 'elixirs',
    component: () => import('../views/ElixirsView.vue'),
    meta: { requiresAuth: true, requiredRole: 'admin' },
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/AuthView.vue'),
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   component: () => import('../views/AdminView.vue'),
  //   meta: { requiresAuth: true, requiredRole: 'admin' },
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
// Use Pinia store for guards
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isSignedIn) {
    next('/auth')
    return
  }
  if (to.meta.requiredRole && userStore.role !== to.meta.requiredRole) {
    next('/')
    return
  }
  next()
})
export { routes }
export default router
