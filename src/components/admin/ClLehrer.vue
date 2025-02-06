<script setup lang="ts">
import type { Lehrer } from '@/interfaces/Lehrer'

const props = defineProps<{
  lehrer: Lehrer
  deleteLehrer: (id?: number) => void
}>()
</script>

<template>
  <div class="flex justify-between">
    <p>{{ props.lehrer.name }}</p>
    <button @click="deleteLehrer(lehrer.id)" class="cursor-pointer">Delete</button>
  </div>
</template>

<style scoped>
p {
  margin-left: 5px;
}

button {
  padding-left: 5px;
  padding-right: 5px;
  background-color: var(--cl-light-blue);
}
</style>
