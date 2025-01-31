<script setup lang="ts">
import { useLehrerStore } from '@/stores/lehrer.ts'
import ClProfileSlider from '@/components/ClProfileSlider.vue'
import type { Vote } from '@/interfaces/Vote.ts'
import router from '@/router'

const store = useLehrerStore()
store.getLehrer()

const votes = store.lehrerData.map((lehrer) => ({
  id: lehrer.id,
  name: lehrer.name,
  score: 0,
}))
function updateVoteValue(id: number, value: number) {
  const index = votes.findIndex((vote) => vote.id === id)
  votes[index].score = value
}

const submitVotes = () => {
  const newVotes: Vote[] = votes
    .filter((vote) => vote.score !== 0)
    .map((vote) => ({
      lehrerId: vote.id,
      vote: vote.score,
    }))
  store.createVotes(newVotes)
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
    <button @click="submitVotes">Submit Votes</button>
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
