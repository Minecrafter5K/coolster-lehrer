<script setup lang="ts">
import ClProfile from '@/components/ClProfile.vue'
import { useLehrerStore } from '@/stores/lehrer.ts'

const store = useLehrerStore()
store.getLehrerRanking()
</script>

<template>
  <main>
    <div class="p_container">
      <ClProfile v-for="lehrer in store.lehrerRanking" :key="lehrer.id" :lehrer="lehrer" />
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

  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
