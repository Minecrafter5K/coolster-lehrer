<script setup lang="ts">
import { ref } from 'vue'
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()
const newLehrerName = ref('')

async function handleSubmit(e: Event) {
  e.preventDefault()

  const newLehrer = { name: newLehrerName.value }
  await adminStore.createLehrer(newLehrer)
  newLehrerName.value = ''
}
</script>

<template>
  <div>
    <form @submit="handleSubmit">
      <label for="lehrer-name">Name des Lehrers:</label>
      <input id="lehrer-name" type="text" v-model="newLehrerName" required />
      <button type="submit">Lehrer erstellen</button>
    </form>
  </div>
</template>
