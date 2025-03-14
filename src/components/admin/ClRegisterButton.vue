<script setup lang="ts">
import { useAdminStore } from '@/stores/admin'
import { startRegistration } from '@simplewebauthn/browser'

const props = defineProps<{
  username?: string
}>()

const emit = defineEmits<{
  (e: 'errorMsg', type: 'authError', msg: string): void
}>()

const baseUrl = import.meta.env.VITE_API_URL

const adminStore = useAdminStore()

async function register() {
  emit('errorMsg', 'authError', '')

  // Request registration options with a userId in the POST body.
  const resp = await fetch(`${baseUrl}/auth/generate-registration-options`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      adminStore.user.isLoggedin
        ? { userId: adminStore.user.user.userId }
        : { username: props.username },
    ),
  })

  const resBody = await resp.json()
  const { opts, userId, username } = resBody

  let attResp
  try {
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
  const verificationResp = await fetch(`${baseUrl}/auth/verify-registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      response: attResp,
    }),
    credentials: 'include',
  })

  const verificationJSON = await verificationResp.json()
  console.log('Server Response', JSON.stringify(verificationJSON, null, 2))

  if (verificationJSON && verificationJSON.verified) {
    adminStore.login({ userId: userId, username })
    console.log('Registration successful!')
  } else {
    emit('errorMsg', 'authError', 'Registration failed')
    console.error('Registration failed!')
  }
}
</script>

<template>
  <button id="register" @click="register">
    <slot />
  </button>
</template>
