<script setup lang="ts">
import { useAdminStore } from '@/stores/admin'
import { startRegistration } from '@simplewebauthn/browser'

const emit = defineEmits<{
  (e: 'errorMsg', type: 'authError', msg: string): void
}>()

const adminStore = useAdminStore()

async function register() {
  emit('errorMsg', 'authError', '')

  // Request registration options with a userId in the POST body.
  const resp = await fetch('http://localhost:3001/auth/generate-registration-options', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: 'internalUserId' }),
  })

  let attResp
  try {
    const opts = await resp.json()

    attResp = await startRegistration({ optionsJSON: opts })
    console.log('Registration Response', JSON.stringify(attResp, null, 2))
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'InvalidStateError') {
      emit('errorMsg', 'authError', 'Authenticator already registered')
    } else {
      emit('errorMsg', 'authError', 'Error on starting registration')
    }
    throw error instanceof Error ? error : new Error(String(error))
  }

  // Verify registration response by posting the data along with the userId.
  const verificationResp = await fetch('http://localhost:3001/auth/verify-registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: 'internalUserId',
      response: attResp,
    }),
    credentials: 'include',
  })

  const verificationJSON = await verificationResp.json()
  console.log('Server Response', JSON.stringify(verificationJSON, null, 2))

  if (verificationJSON && verificationJSON.verified) {
    adminStore.login()
    console.log('Registration successful!')
  } else {
    emit('errorMsg', 'authError', 'Registration failed')
    console.error('Registration failed!')
  }
}
</script>

<template>
  <button @click="register" class="rounded-lg bg-black p-1.5 px-2.5">Register</button>
</template>
