import { defineStore } from 'pinia'
import { mande } from 'mande'
import type { Lehrer, LehrerWithScore } from '@/interfaces/Lehrer.ts'
import type { Vote } from '@/interfaces/Vote.ts'

const lehrer = mande('http://localhost:3001/lehrer')
const currentAbstimmungId = mande('http://localhost:3001/votes/currentUmfrage')
const lehrerRank = mande('http://localhost:3001/votes/rank')
const bulkCreateVotes = mande('http://localhost:3001/votes/bulk')

export const useLehrerStore = defineStore('lehrer', {
  state: (): {
    lehrerData: Lehrer[]
    lehrerRanking: LehrerWithScore[]
    currentAbstimmungId: number
  } => ({
    lehrerData: [],
    lehrerRanking: [],
    currentAbstimmungId: 0,
  }),
  actions: {
    async getLehrer() {
      this.lehrerData = await lehrer.get()
    },
    async getCurrentAbstimmungId() {
      this.currentAbstimmungId = await currentAbstimmungId.get()
    },

    async getLehrerRanking(abstimmungId: number) {
      this.lehrerRanking = await lehrerRank.get(String(abstimmungId))
    },

    async createVotes(votes: Vote[]) {
      await bulkCreateVotes.post(votes)
    },
  },
})
