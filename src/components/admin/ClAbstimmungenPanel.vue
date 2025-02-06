<script setup lang="ts">
import { useAdminStore } from '@/stores/admin'
import ClAbstimmung from './ClAbstimmung.vue'

const store = useAdminStore()
store.fetchAbstimmungen()

async function deleteAbstimmung(id?: number) {
  if (id === undefined) return
  await store.deleteAbstimmung(id)
}
</script>

<template>
  <div class="container">
    <ClAbstimmung
      v-for="abstimmung in store.abstimmungen"
      :key="abstimmung.id"
      :abstimmung="abstimmung"
      :delete-abstimmung="(id) => deleteAbstimmung(id)"
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
