<script setup lang="ts">
import ClLoginButton from '@/components/admin/ClLoginButton.vue'
import ClRegisterButton from '@/components/admin/ClRegisterButton.vue'
import { useAdminStore } from '@/stores/admin'
import { ref } from 'vue'

const store = useAdminStore()
const error = ref('')
const username = ref('')

store.checkLogin()
</script>

<template>
  <main class="center">
    <div class="container">
      <h1>Login</h1>
      <!-- logged in -->
      <div v-if="store.user.isLoggedin">
        <p>Hello {{ store.user.user.username }}!</p>
        <button @click="store.logout"><span class="underlined">Logout</span></button>
        or: <br />
        <br />
        <ClRegisterButton
          :username="store.user.user.username"
          v-on:error-msg="(type, msg) => (error = msg)"
          >Register new Authenticator</ClRegisterButton
        >
        <p id="error" class="text-red-500">{{ error }}</p>
      </div>
      <!-- logged out -->
      <div v-else>
        <input type="text" v-model="username" placeholder="Username" />
        <ClLoginButton :username="username" v-on:error-msg="(type, msg) => (error = msg)" />
        <p id="error" class="text-red-500">{{ error }}</p>
        <p>
          <router-link to="/register"
            >Switch to <span class="underlined">Registration</span></router-link
          >
        </p>
      </div>
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

#register,
#login {
  background-color: var(--cl-green);

  padding: 5px 10px;
  border-radius: 10px;
}

#error {
  margin-top: 5px;
}
</style>
