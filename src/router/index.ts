import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StatsView from '../views/StatsView.vue'
import JahrView from '../views/JahrView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/stats',
      name: 'jahre',
      component: JahrView,
    },
    {
      path: '/stats/:abstimmungId',
      name: 'stats',
      component: StatsView,
    },
  ],
})

export default router
