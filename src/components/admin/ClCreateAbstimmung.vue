<script setup lang="ts">
import { ref } from 'vue'
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()
const newAbstimmungName = ref('')
const newAbstimmungId = ref(0)

async function handleSubmit(e: Event) {
  e.preventDefault()
  const newId = newAbstimmungId.value === 0 ? undefined : newAbstimmungId.value

  const newAbstimmung = { id: newId, name: newAbstimmungName.value }
  await adminStore.createAbstimmung(newAbstimmung)
  newAbstimmungName.value = ''
  newAbstimmungId.value = 0
}
</script>

<template>
  <div>
    <form @submit="handleSubmit">
      <label for="abstimmung-name">Name der Abstimmung:</label>
      <input id="abstimmung-name" type="text" v-model="newAbstimmungName" required />
      <input id="abstimmung-id" type="text" v-model="newAbstimmungId" />
      <button type="submit">Abstimmung erstellen</button>
    </form>
  </div>
</template>
