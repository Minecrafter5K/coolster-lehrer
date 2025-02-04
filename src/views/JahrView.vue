<script setup lang="ts">
import ClJahr from '@/components/ClJahr.vue'
import { useLehrerStore } from '@/stores/lehrer.ts'

const store = useLehrerStore()
store.fetchAbstimmungen()
</script>

<template>
  <main>
    <div class="p_container">
      <ClJahr
        v-for="abstimmung in store.abstimmungen"
        :key="abstimmung.id"
        :abstimmung="abstimmung"
      />
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
