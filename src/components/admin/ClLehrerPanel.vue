<script setup lang="ts">
import ClLehrer from './ClLehrer.vue'
import { useAdminStore } from '@/stores/admin'

const store = useAdminStore()
store.fetchLehrer()

async function deleteLehrer(id?: number) {
  if (id === undefined) return
  await store.deleteLehrer(id)
}
</script>

<template>
  <div class="container">
    <ClLehrer
      v-for="lehrer in store.lehrerData"
      :key="lehrer.id"
      :lehrer="lehrer"
      :delete-lehrer="(id) => deleteLehrer(id)"
    />
  </div>
</template>

<style scoped>
.container {
  background-color: var(--cl-light-green);
}

.container div:nth-child(even) {
  background-color: var(--cl-green);
}
</style>
