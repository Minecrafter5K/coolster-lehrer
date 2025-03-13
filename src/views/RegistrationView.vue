<script setup lang="ts">
import ClRegisterButton from '@/components/admin/ClRegisterButton.vue'
import { ref } from 'vue'

const error = ref('')
const username = ref('') // Neuer Ref für den Benutzernamen
</script>

<template>
  <main class="center">
    <div class="container">
      <h1>Register</h1>
      <div class="center">
        <input type="text" v-model="username" placeholder="Username" />
        <ClRegisterButton :username="username" v-on:error-msg="(type, msg) => (error = msg)"
          >Register</ClRegisterButton
        >
        <p id="error" class="text-red-500">{{ error }}</p>
      </div>
      <p>
        <router-link to="/login">Switch to <span class="underlined">Login</span></router-link>
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

#register {
  background-color: var(--cl-green);

  padding: 5px 10px;
  border-radius: 10px;
}

#error {
  margin-top: 5px;
}
</style>
