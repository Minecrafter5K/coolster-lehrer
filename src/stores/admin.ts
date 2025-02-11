import type { Abstimmung } from '@/interfaces/Abstimmung'
import type { Lehrer, LehrerWithoutId } from '@/interfaces/Lehrer'
import router from '@/router'
import { mande } from 'mande'
import { defineStore } from 'pinia'

const baseUrl = import.meta.env.VITE_API_URL

const allAbstimmungen = mande(`${baseUrl}/votes/abstimmungen`)
const allLehrer = mande(`${baseUrl}/lehrer`)

const createAbstimmung = mande(`${baseUrl}/admin/createAbstimmung`)
const createLehrer = mande(`${baseUrl}/admin/createLehrer`)

const lehrer = mande(`${baseUrl}/admin/lehrer`)
const abstimmungen = mande(`${baseUrl}/admin/abstimmung`)

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
      await fetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      this.isLoggedin = false
      router.push('/login')
    },
    async checkLogin() {
      const res = await fetch(`${baseUrl}/auth/ping`, {
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
