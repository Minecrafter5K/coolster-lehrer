import { defineStore } from 'pinia'
import type { Lehrer, LehrerWithScore } from '@/interfaces/Lehrer.ts'
import type { Vote } from '@/interfaces/Vote.ts'
import type { Abstimmung, AbstimmungDetail } from '@/interfaces/Abstimmung'
import { ref } from 'vue'
const baseUrl = import.meta.env.VITE_API_URL

export const useLehrerStore = defineStore('lehrer', () => {
  const lehrerData = ref<Lehrer[]>([])
  const lehrerRanking = ref<LehrerWithScore[]>([])
  const abstimmungenDetail = ref<AbstimmungDetail[]>([])
  const currentAbstimmung = ref<Abstimmung>()

  const fetchLehrer = async () => {
    const res = await fetch(`${baseUrl}/lehrer`)
    lehrerData.value = await res.json()
  }

  async function fetchCurrentAbstimmungId() {
    const res = await fetch(`${baseUrl}/votes/currentAbstimmung`)
    currentAbstimmung.value = await res.json()
  }
  async function fetchLehrerRanking(abstimmungId: number) {
    const res = await fetch(`${baseUrl}/votes/rank/${abstimmungId}`)
    lehrerRanking.value = await res.json()
  }
  async function fetchAbstimmungenDetail() {
    const res = await fetch(`${baseUrl}/votes/abstimmungen/detail`)
    abstimmungenDetail.value = await res.json()
    abstimmungenDetail.value.reverse()
  }

  async function createVotes(votes: Vote[]) {
    await fetch(`${baseUrl}/votes/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(votes),
    })
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
