import { defineStore } from 'pinia'
import { mande } from 'mande'
import type { Lehrer } from '@/interfaces/Lehrer.ts'

const lehrer = mande('http://localhost:3001/lehrer')

export const useLehrerStore = defineStore('lehrer', {
  state: (): { lehrerData: Lehrer[] } => ({
    lehrerData: [],
  }),
  actions: {
    async getLehrer() {
      this.lehrerData = await lehrer.get()
      console.log(this.lehrerData)
    },
  },
})
