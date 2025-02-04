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
    <button @click="deleteLehrer(lehrer.id)" class="cursor-pointer bg-amber-800">delete</button>
  </div>
</template>
