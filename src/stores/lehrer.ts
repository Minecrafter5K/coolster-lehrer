import { defineStore } from 'pinia'
import { mande } from 'mande'
import type { Lehrer, LehrerWithScore } from '@/interfaces/Lehrer.ts'
import type { Vote } from '@/interfaces/Vote.ts'
import type { Abstimmung, AbstimmungDetail } from '@/interfaces/Abstimmung'
import { ref } from 'vue'

const baseUrl = import.meta.env.VITE_API_URL

const lehrerApi = mande(`${baseUrl}/lehrer`)
const abstimmungenDetailApi = mande(`${baseUrl}/votes/abstimmungen/detail`)

const currentAbstimmungApi = mande(`${baseUrl}/votes/currentAbstimmung`)
const lehrerRankApi = mande(`${baseUrl}/votes/rank`)
const bulkCreateVotesApi = mande(`${baseUrl}/votes/bulk`)

export const useLehrerStore = defineStore('lehrer', () => {
  const lehrerData = ref<Lehrer[]>([])
  const lehrerRanking = ref<LehrerWithScore[]>([])
  const abstimmungenDetail = ref<AbstimmungDetail[]>([])
  const currentAbstimmung = ref<Abstimmung>()

  const fetchLehrer = async () => {
    lehrerData.value = await lehrerApi.get()
  }
  async function fetchCurrentAbstimmungId() {
    currentAbstimmung.value = await currentAbstimmungApi.get()
  }
  async function fetchLehrerRanking(abstimmungId: number) {
    lehrerRanking.value = await lehrerRankApi.get(String(abstimmungId))
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
    abstimmungenDetail,
    currentAbstimmung,
    fetchLehrer,
    fetchLehrerRanking,
    fetchAbstimmungenDetail,
    fetchCurrentAbstimmungId,
    createVotes,
  }
})
