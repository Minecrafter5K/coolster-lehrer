<script setup lang="ts">
import { useLehrerStore } from '@/stores/lehrer.ts'
import ClJahr from '@/components/ClJahr.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const store = useLehrerStore()
store.fetchLehrerRanking(Number(route.params.abstimmungId))
</script>

<template>
  <main>
    <div class="p_container">
      <ClJahr />
      <ClJahr />
    </div>
  </main>
</template>

<style scoped>
.p_container {
  justify-content: center;
  overflow: hidden;
  display: flex;
  gap: 18px 30px;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;

  margin-top: 30px;
}
</style>
