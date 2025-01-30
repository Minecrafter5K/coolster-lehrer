<script setup lang="ts">
import ClProfile from '@/components/ClProfile.vue'
import { useLehrerStore } from '@/stores/lehrer.ts'

const store = useLehrerStore()
store.getLehrer()
</script>

<template>
  <main>
    <h1>Was geht?</h1>
    <div class="p_container">
      <ClProfile v-for="lehrer in store.lehrerData" :key="lehrer.id" :name="lehrer.name" />
    </div>
  </main>
</template>
