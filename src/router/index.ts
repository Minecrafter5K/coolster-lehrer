import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StatsView from '../views/StatsView.vue'
import JahrView from '../views/JahrView.vue'
import AdminView from '@/views/AdminView.vue'
import LoginView from '@/views/LoginView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import { useAdminStore } from '@/stores/admin'

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
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      beforeEnter: async () => {
        const store = useAdminStore()
        await store.checkLogin()

        if (store.isLoggedin) return true
        return false
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegistrationView,
    },
  ],
})

export default router
