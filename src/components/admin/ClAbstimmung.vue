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
    <button @click="deleteAbstimmung(abstimmung.id)" class="cursor-pointer bg-amber-800">
      delete
    </button>
  </div>
</template>
