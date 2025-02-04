import { defineStore } from 'pinia'
import { mande } from 'mande'
import type { Lehrer, LehrerWithScore } from '@/interfaces/Lehrer.ts'
import type { Vote } from '@/interfaces/Vote.ts'
import type { Abstimmung } from '@/interfaces/Abstimmung'

const lehrer = mande('http://localhost:3001/lehrer')
const abstimmungen = mande('http://localhost:3001/votes/abstimmungen')
const currentAbstimmungId = mande('http://localhost:3001/votes/currentAbstimmung')
const lehrerRank = mande('http://localhost:3001/votes/rank')
const bulkCreateVotes = mande('http://localhost:3001/votes/bulk')

const abstimmungDetail = mande('localhost:3001/votes/abstimmung')

export const useLehrerStore = defineStore('lehrer', {
  state: (): {
    lehrerData: Lehrer[]
    lehrerRanking: LehrerWithScore[]
    abstimmungen: Abstimmung[]
    currentAbstimmungId: number
  } => ({
    lehrerData: [],
    lehrerRanking: [],
    abstimmungen: [],
    currentAbstimmungId: 0,
  }),
  actions: {
    async fetchLehrer() {
      this.lehrerData = await lehrer.get()
    },
    async fetchCurrentAbstimmungId() {
      this.currentAbstimmungId = await currentAbstimmungId.get()
    },
    async fetchLehrerRanking(abstimmungId: number) {
      this.lehrerRanking = await lehrerRank.get(String(abstimmungId))
    },
    async fetchAbstimmungen() {
      this.abstimmungen = await abstimmungen.get()
    },
    async fetchAbstimmungenDetail(abstimmungId: number) {
      return await abstimmungDetail.get(String(abstimmungId))
    },

    async createVotes(votes: Vote[]) {
      await bulkCreateVotes.post(votes)
    },
  },
})
