<script setup lang="ts">
import type { Abstimmung } from '@/interfaces/Abstimmung'

const props = defineProps<{
  abstimmung: Abstimmung
  deleteAbstimmung: (id?: number) => void
}>()
</script>

<template>
  <div class="flex justify-between">
    <p>{{ props.abstimmung.name }}</p>
    <p>{{ props.abstimmung.startDate }}</p>
    <p>{{ props.abstimmung.endDate }}</p>
    <button @click="deleteAbstimmung(abstimmung.id)" class="cursor-pointer bg-amber-800">
      Delete
    </button>
  </div>
</template>

<style scoped>
button {
  background-color: var(--cl-light-blue);
}

p {
  margin-left: 5px;
}

button {
  padding-left: 5px;
  padding-right: 5px;
}
</style>
