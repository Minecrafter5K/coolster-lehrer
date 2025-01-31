<script setup lang="ts">
import { useLehrerStore } from '@/stores/lehrer.ts'
import ClProfileSlider from '@/components/ClProfileSlider.vue'

const store = useLehrerStore()
store.getLehrer()
</script>

<template>
  <main>
    <div class="p_container">
      <ClProfileSlider v-for="lehrer in store.lehrerData" :key="lehrer.id" :name="lehrer.name" />
    </div>
  </main>
</template>

<style scoped>
.p_container {
  justify-content: center;
  overflow: hidden;
  display: flex;
  gap: 18px 30px;
  flex-wrap: wrap;

  margin: 30px;
}
</style>
