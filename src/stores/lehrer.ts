import { defineStore } from 'pinia'
import { mande } from 'mande'
import type { Lehrer, LehrerWithScore } from '@/interfaces/Lehrer.ts'
import type { Vote } from '@/interfaces/Vote.ts'

const lehrer = mande('http://localhost:3001/lehrer')
const lehrerRank = mande('http://localhost:3001/votes/rank')
const bulkCreateVotes = mande('http://localhost:3001/votes/bulk')

export const useLehrerStore = defineStore('lehrer', {
  state: (): { lehrerData: Lehrer[]; lehrerRanking: LehrerWithScore[] } => ({
    lehrerData: [],
    lehrerRanking: [],
  }),
  actions: {
    async getLehrer() {
      this.lehrerData = await lehrer.get()
    },
    async getLehrerRanking() {
      this.lehrerRanking = await lehrerRank.get()
    },

    async createVotes(votes: Vote[]) {
      await bulkCreateVotes.post(votes)
    },
  },
})
