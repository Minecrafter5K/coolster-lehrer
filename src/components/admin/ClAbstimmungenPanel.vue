<script setup lang="ts">
import { useAdminStore } from '@/stores/admin'
import ClAbstimmung from './ClAbstimmung.vue'

const store = useAdminStore()

async function deleteAbstimmung(id?: number) {
  if (id === undefined) return
  await store.deleteAbstimmung(id)
}
</script>

<template>
  <div class="bg-amber-950">
    <ClAbstimmung
      v-for="abstimmung in store.abstimmungen"
      :key="abstimmung.id"
      :abstimmung="abstimmung"
      :delete-abstimmung="(id) => deleteAbstimmung(id)"
    />
  </div>
</template>
