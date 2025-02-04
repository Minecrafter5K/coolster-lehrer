import type { Abstimmung } from '@/interfaces/Abstimmung'
import type { Lehrer } from '@/interfaces/Lehrer'
import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: (): {
    abstimmungen: Abstimmung[]
    lehrerData: Lehrer[]
  } => ({
    abstimmungen: [
      { id: 1, name: 'Abstimmung 1' },
      { id: 2, name: 'Abstimmung 2' },
      { id: 3, name: 'Abstimmung 3' },
    ],
    lehrerData: [
      { id: 1, name: 'Lehrer 1' },
      { id: 2, name: 'Lehrer 2' },
      { id: 3, name: 'Lehrer 3' },
    ],
  }),
  actions: {
    async createAbstimmung(abstimmung: Abstimmung) {
      this.abstimmungen.push(abstimmung)
      console.log('Abstimmung erstellt:', abstimmung)
      console.log('Abstimmungen:', this.abstimmungen)
    },
    async createLehrer(lehrer: Lehrer) {
      this.lehrerData.push(lehrer)
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
