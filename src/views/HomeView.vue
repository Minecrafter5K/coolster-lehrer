<script setup lang="ts">
import { useLehrerStore } from '@/stores/lehrer.ts'
import ClProfileSlider from '@/components/ClProfileSlider.vue'
import type { Vote } from '@/interfaces/Vote.ts'
import router from '@/router'
import { computed } from 'vue'

const store = useLehrerStore()
store.getLehrer()

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

const submitVotes = () => {
  const newVotes: Vote[] = votes.value
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
    <button id="btn" @click="submitVotes">Submit</button>
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

@media (min-width: 650px) {
  #btn {
    padding: 0;
    width: 130px;
    height: 50px;
    border-radius: 15px;

    position: absolute;
    left: 69px;
  }
}
</style>
