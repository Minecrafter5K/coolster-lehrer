<script setup lang="ts">
import { useAdminStore } from '@/stores/admin'
import { startAuthentication } from '@simplewebauthn/browser'

const emit = defineEmits<{
  (e: 'errorMsg', type: 'authError', msg: string): void
}>()

const adminStore = useAdminStore()

async function login() {
  emit('errorMsg', 'authError', '')

  // Request authentication options with userId in the POST body.
  const resp = await fetch('http://localhost:3001/auth/generate-authentication-options', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: 'internalUserId' }),
  })
  let asseResp
  try {
    const opts = await resp.json()
    asseResp = await startAuthentication({ optionsJSON: opts })
  } catch (error) {
    emit('errorMsg', 'authError', 'Error on starting authentication')
    throw new Error(error as string)
  }
  // Verify authentication response by posting the data with userId.
  const verificationResp = await fetch('http://localhost:3001/auth/verify-authentication', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: 'internalUserId',
      response: asseResp,
    }),
    credentials: 'include',
  })
  const verificationJSON = await verificationResp.json()
  console.log('Server Response', JSON.stringify(verificationJSON, null, 2))
  if (verificationJSON && verificationJSON.verified) {
    adminStore.login()
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
