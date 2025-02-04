<script setup lang="ts">
import ClLehrer from './ClLehrer.vue'
import { useAdminStore } from '@/stores/admin'

const store = useAdminStore()

async function deleteLehrer(id?: number) {
  if (id === undefined) return
  await store.deleteLehrer(id)
}
</script>

<template>
  <div class="bg-amber-950">
    <ClLehrer
      v-for="lehrer in store.lehrerData"
      :key="lehrer.id"
      :lehrer="lehrer"
      :delete-lehrer="(id) => deleteLehrer(id)"
    />
  </div>
</template>
