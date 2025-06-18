import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HousesView from '../views/HousesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    },
  ],
})

export default router
