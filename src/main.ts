import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

export const app = createApp(App)

export const pinia = createPinia()

app.use(router)

app.mount('#app')
