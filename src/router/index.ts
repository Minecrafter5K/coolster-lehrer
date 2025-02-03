import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StatsView from '../views/StatsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    /*{
      path: '/stats',
      name: 'abstimmungen',
      component: StatsView,
    },*/
    {
      path: '/stats/:abstimmungId',
      name: 'statsFromAbstimmung',
      component: StatsView,
    },
  ],
})

export default router
