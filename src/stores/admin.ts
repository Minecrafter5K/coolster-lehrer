import type { Abstimmung } from '@/interfaces/Abstimmung'
import type { Lehrer, LehrerWithoutId } from '@/interfaces/Lehrer'
import router from '@/router'
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
    isLoggedin: boolean
    abstimmungen: Abstimmung[]
    lehrerData: Lehrer[]
  } => ({
    isLoggedin: false,
    abstimmungen: [],
    lehrerData: [],
  }),
  actions: {
    async login() {
      this.isLoggedin = true
    },
    async logout() {
      await fetch('http://localhost:3001/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      this.isLoggedin = false
      router.push('/login')
    },
    async checkLogin() {
      const res = await fetch('http://localhost:3001/auth/ping', {
        credentials: 'include',
      })

      if (res.status === 200) {
        this.isLoggedin = true
      } else {
        this.isLoggedin = false
      }
    },

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
