<script setup lang="ts">
import ClLoginButton from '@/components/admin/ClLoginButton.vue'
import { useAdminStore } from '@/stores/admin'
import { ref } from 'vue'

const store = useAdminStore()
const error = ref('')
</script>

<template>
  <main class="center">
    <div class="container">
      <h1>Login</h1>
      <div class="center">
        <ClLoginButton v-on:error-msg="(type, msg) => (error = msg)" />
        <p id="error" class="text-red-500">{{ error }}</p>
      </div>
      <p>
        <router-link to="/register"
          >Switch to <span class="underlined">Registration</span></router-link
        >
        or:
        <button @click="store.logout"><span class="underlined">logout</span></button>
      </p>
    </div>
  </main>
</template>

<style scoped>
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 400px;

  gap: 10px;
  padding: 10px;

  margin-top: 50px;
  border-radius: 25px;

  background-color: var(--cl-light-green);
}

h1 {
  font-size: 30px;
}

.underlined {
  text-decoration: underline;
}

#login {
  background-color: var(--cl-green);

  padding: 5px 10px;
  border-radius: 10px;
}

#error {
  margin-top: 5px;
}
</style>
