import { defineStore } from 'pinia'
import { mande } from 'mande'
import type { Lehrer, LehrerWithScore } from '@/interfaces/Lehrer.ts'
import type { Vote } from '@/interfaces/Vote.ts'
import type { Abstimmung, AbstimmungDetail } from '@/interfaces/Abstimmung'
import { ref } from 'vue'

const lehrerApi = mande('http://localhost:3001/lehrer')
const abstimmungenApi = mande('http://localhost:3001/votes/abstimmungen')
const abstimmungenDetailApi = mande('http://localhost:3001/votes/abstimmungen/detail')

const currentAbstimmungIdApi = mande('http://localhost:3001/votes/currentAbstimmung')
const lehrerRankApi = mande('http://localhost:3001/votes/rank')
const bulkCreateVotesApi = mande('http://localhost:3001/votes/bulk')

export const useLehrerStore = defineStore('lehrer', () => {
  const lehrerData = ref<Lehrer[]>([])
  const lehrerRanking = ref<LehrerWithScore[]>([])
  const abstimmungen = ref<Abstimmung[]>([])
  const abstimmungenDetail = ref<AbstimmungDetail[]>([])
  const currentAbstimmungId = ref<number>(0)

  const fetchLehrer = async () => {
    lehrerData.value = await lehrerApi.get()
  }
  async function fetchCurrentAbstimmungId() {
    currentAbstimmungId.value = await currentAbstimmungIdApi.get()
  }
  async function fetchLehrerRanking(abstimmungId: number) {
    lehrerRanking.value = await lehrerRankApi.get(String(abstimmungId))
  }
  async function fetchAbstimmungen() {
    abstimmungen.value = await abstimmungenApi.get()
  }
  async function fetchAbstimmungenDetail() {
    abstimmungenDetail.value = await abstimmungenDetailApi.get()
    abstimmungenDetail.value.reverse()
  }

  async function createVotes(votes: Vote[]) {
    await bulkCreateVotesApi.post(votes)
  }

  return {
    lehrerData,
    lehrerRanking,
    abstimmungen,
    abstimmungenDetail,
    currentAbstimmungId,
    fetchLehrer,
    fetchLehrerRanking,
    fetchAbstimmungen,
    fetchAbstimmungenDetail,
    fetchCurrentAbstimmungId,
    createVotes,
  }
})
