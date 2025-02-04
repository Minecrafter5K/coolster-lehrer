import type { Abstimmung } from '@/interfaces/Abstimmung'
import type { Lehrer, LehrerWithoutId } from '@/interfaces/Lehrer'
import { mande } from 'mande'
import { defineStore } from 'pinia'

const allAbstimmungen = mande('http://localhost:3001/votes/umfragen')
const allLehrer = mande('http://localhost:3001/lehrer')

export const useAdminStore = defineStore('admin', {
  state: (): {
    abstimmungen: Abstimmung[]
    lehrerData: Lehrer[]
  } => ({
    abstimmungen: [],
    lehrerData: [],
  }),
  actions: {
    async fetchAbstimmungen() {
      this.abstimmungen = await allAbstimmungen.get()
    },
    async fetchLehrer() {
      this.lehrerData = await allLehrer.get()
    },

    async createAbstimmung(abstimmung: Abstimmung) {
      this.abstimmungen.push(abstimmung)
      console.log('Abstimmung erstellt:', abstimmung)
      console.log('Abstimmungen:', this.abstimmungen)
    },
    async createLehrer(lehrer: LehrerWithoutId) {
      this.lehrerData.push({ id: this.lehrerData.length + 1, ...lehrer })
      console.log('Lehrer erstellt:', lehrer)
      console.log('Lehrer:', this.lehrerData)
    },

    async deleteAbstimmung(id: number) {
      this.abstimmungen = this.abstimmungen.filter((a) => a.id !== id)
      console.log('Abstimmung gelöscht:', id)
      console.log('Abstimmungen:', this.abstimmungen)
    },
    async deleteLehrer(id: number) {
      this.lehrerData = this.lehrerData.filter((a) => a.id !== id)
      console.log('Lehrer gelöscht:', id)
      console.log('Lehrer:', this.lehrerData)
    },
  },
})
