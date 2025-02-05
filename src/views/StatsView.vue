<script setup lang="ts">
import ClProfile from '@/components/ClProfile.vue'
import { useLehrerStore } from '@/stores/lehrer.ts'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'

const route = useRoute()

const store = useLehrerStore()
store.fetchLehrerRanking(Number(route.params.abstimmungId))

const thisAbstimmung = computed(() =>
  store.abstimmungenDetail.find((a) => a.id === Number(route.params.abstimmungId)),
)

onMounted(async () => {
  await store.fetchAbstimmungenDetail()
})
</script>

<template>
  <main>
    <p>{{ thisAbstimmung?.name }}</p>
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

  margin-top: 1rem;
  margin-bottom: 2rem;
}

p {
  display: grid;
  justify-content: center;
  font-size: 15px;
}
</style>
