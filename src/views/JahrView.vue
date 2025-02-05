<script setup lang="ts">
import ClJahr from '@/components/ClJahr.vue'
import { useLehrerStore } from '@/stores/lehrer.ts'
import { onMounted } from 'vue'

const store = useLehrerStore()

onMounted(async () => {
  await store.fetchAbstimmungenDetail()
})
</script>

<template>
  <main>
    <div class="p_container">
      <router-link
        class="w-full"
        :to="'/stats/' + abstimmung.id"
        v-for="abstimmung in store.abstimmungenDetail"
        :key="abstimmung.id"
      >
        <ClJahr :abstimmung="abstimmung" />
      </router-link>
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
