<script setup lang="ts">
import { useLehrerStore } from '@/stores/lehrer.ts'
import ClProfileSlider from '@/components/ClProfileSlider.vue'
import type { Vote } from '@/interfaces/Vote.ts'
import { computed, ref } from 'vue'
import router from '@/router'

const store = useLehrerStore()
store.fetchLehrer()
store.fetchCurrentAbstimmungId()

const loading = ref(false)

const votes = computed(() =>
  store.lehrerData.map((lehrer) => ({
    id: lehrer.id,
    name: lehrer.name,
    score: 0,
  })),
)

function updateVoteValue(id: number, value: number) {
  const index = votes.value.findIndex((vote) => vote.id === id)
  votes.value[index].score = value
}

const submitVotes = async () => {
  const newVotes: Vote[] = votes.value
    .filter((vote) => vote.score !== 0)
    .map((vote) => ({
      lehrerId: vote.id,
      vote: vote.score,
      abstimmungId: store.currentAbstimmung!.id!,
    }))
  console.log('newVotes')
  await store.createVotes(newVotes)
  console.log('votes created')
  loading.value = true
  router.push('/stats')
}
</script>

<template>
  <main>
    <div class="p_container">
      <ClProfileSlider
        v-for="lehrer in votes"
        :key="lehrer.id"
        :lehrer="lehrer"
        :vote-value="lehrer.score"
        @update:voteValue="($event) => updateVoteValue(lehrer.id, $event)"
      />
    </div>
    <button id="btn" @click="submitVotes" :disabled="loading">Submit</button>
  </main>
</template>

<style scoped>
.p_container {
  justify-content: center;
  overflow: hidden;
  display: flex;
  gap: 18px 30px;
  flex-wrap: wrap;

  margin-top: 30px;
  margin-bottom: 30px;
}

#btn {
  background-color: var(--cl-light-blue);
  color: var(--cl-text);
  font-weight: bold;
  font-size: 1.2rem;

  width: 145px;
  height: 30px;
  padding: 0;
  margin-bottom: 40px;

  display: flex;
  justify-self: center;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 15px;
  cursor: pointer;
}

.loading-btn {
  background-color: var(--cl-light-blue);
  color: var(--cl-text);
  cursor: wait;
}

@media (min-width: 650px) {
  #btn {
    padding: 0;
    width: 130px;
    height: 50px;
    border-radius: 15px;

    justify-self: flex-start;
  }
}
</style>
