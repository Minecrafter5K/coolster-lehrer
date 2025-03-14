<script setup lang="ts">
import { useAdminStore } from '@/stores/admin'
import { startAuthentication } from '@simplewebauthn/browser'

const props = defineProps<{
  username: string
}>()

const emit = defineEmits<{
  (e: 'errorMsg', type: 'authError', msg: string): void
}>()

const baseUrl = import.meta.env.VITE_API_URL

const adminStore = useAdminStore()

async function login() {
  emit('errorMsg', 'authError', '')

  // Request authentication options with userId in the POST body.
  const resp = await fetch(`${baseUrl}/auth/generate-authentication-options`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: props.username }),
  })

  const resBody = await resp.json()
  const { opts, userId, username } = resBody

  let asseResp
  try {
    asseResp = await startAuthentication({ optionsJSON: opts })
  } catch (error) {
    emit('errorMsg', 'authError', 'Error on starting authentication')
    throw new Error(error as string)
  }
  // Verify authentication response by posting the data with userId.
  const verificationResp = await fetch(`${baseUrl}/auth/verify-authentication`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      response: asseResp,
    }),
    credentials: 'include',
  })
  const verificationJSON = await verificationResp.json()
  console.log('Server Response', JSON.stringify(verificationJSON, null, 2))
  if (verificationJSON && verificationJSON.verified) {
    adminStore.login({ userId: userId, username })
    console.log('Authentication successful!')
  } else {
    emit('errorMsg', 'authError', 'Authentication failed')
    console.error('Authentication failed!')
  }
}
</script>

<template>
  <button @click="login" id="login">Login</button>
</template>
