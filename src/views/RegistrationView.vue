<script setup lang="ts">
import ClRegisterButton from '@/components/admin/ClRegisterButton.vue'
import { useAdminStore } from '@/stores/admin'
import { ref } from 'vue'

const store = useAdminStore()
const error = ref('')
</script>

<template>
  <main>
    <h1 class="mt-6 mb-4 text-3xl">Register</h1>
    <div>
      <ClRegisterButton v-on:error-msg="(type, msg) => (error = msg)" />
      <p class="text-red-500">{{ error }}</p>
    </div>
    <p>
      <router-link to="/login">Switch to Login</router-link> or:
      <button @click="store.logout">logout</button>
    </p>
  </main>
</template>
