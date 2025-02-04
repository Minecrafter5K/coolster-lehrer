import type { Abstimmung } from '@/interfaces/Abstimmung'
import type { Lehrer, LehrerWithoutId } from '@/interfaces/Lehrer'
import { mande } from 'mande'
import { defineStore } from 'pinia'

const allAbstimmungen = mande('http://localhost:3001/votes/abstimmungen')
const allLehrer = mande('http://localhost:3001/lehrer')

const createAbstimmung = mande('http://localhost:3001/admin/createAbstimmung')
const createLehrer = mande('http://localhost:3001/admin/createLehrer')

const lehrer = mande('http://localhost:3001/admin/lehrer')
const abstimmungen = mande('http://localhost:3001/admin/abstimmungen')

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
      await createAbstimmung.post(abstimmung)
      await this.fetchAbstimmungen()
    },
    async createLehrer(lehrer: LehrerWithoutId) {
      await createLehrer.post(lehrer)
      await this.fetchLehrer()
    },

    async deleteAbstimmung(id: number) {
      await abstimmungen.delete(id)
      await this.fetchAbstimmungen()
    },
    async deleteLehrer(id: number) {
      await lehrer.delete(id)
      await this.fetchLehrer()
    },
  },
})
