<script setup lang="ts">
import ClLoginButton from '@/components/admin/ClLoginButton.vue'
import { useAdminStore } from '@/stores/admin'
import { ref } from 'vue'

const store = useAdminStore()
const error = ref('')
</script>

<template>
  <main>
    <h1 class="mt-6 mb-4 text-3xl">Login</h1>
    <div>
      <ClLoginButton v-on:error-msg="(type, msg) => (error = msg)" />
      <p class="text-red-500">{{ error }}</p>
    </div>
    <p>
      <router-link to="/register">Switch to Registration</router-link> or:
      <button @click="store.logout">logout</button>
    </p>
  </main>
</template>
