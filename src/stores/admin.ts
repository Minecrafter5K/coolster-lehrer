import type { Abstimmung } from '@/interfaces/Abstimmung'
import type { Lehrer, LehrerWithoutId } from '@/interfaces/Lehrer'
import type { User } from '@/interfaces/User'
import router from '@/router'
import { defineStore } from 'pinia'

const baseUrl = import.meta.env.VITE_API_URL

export const useAdminStore = defineStore('admin', {
  state: (): {
    user: { isLoggedin: false } | { isLoggedin: true; user: User }
    abstimmungen: Abstimmung[]
    lehrerData: Lehrer[]
  } => ({
    user: { isLoggedin: false },
    abstimmungen: [],
    lehrerData: [],
  }),
  actions: {
    async login(user: User) {
      this.user = { isLoggedin: true, user }
    },
    async logout() {
      await fetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      this.user = { isLoggedin: false }
      router.push('/login')
    },
    async checkLogin() {
      const res = await fetch(`${baseUrl}/auth/ping`, {
        credentials: 'include',
      })
      const { user } = await res.json()

      if (res.status === 200) {
        this.user = { isLoggedin: true, user }
      } else {
        this.user = { isLoggedin: false }
      }
    },

    async fetchAbstimmungen() {
      const res = await fetch(`${baseUrl}/votes/abstimmungen`, { credentials: 'include' })
      this.abstimmungen = await res.json()
    },
    async fetchLehrer() {
      const res = await fetch(`${baseUrl}/lehrer`, { credentials: 'include' })
      this.lehrerData = await res.json()
    },

    async createAbstimmung(abstimmung: Abstimmung) {
      await fetch(`${baseUrl}/admin/createAbstimmung`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(abstimmung),
        credentials: 'include',
      })
      await this.fetchAbstimmungen()
    },
    async createLehrer(lehrer: LehrerWithoutId) {
      await fetch(`${baseUrl}/admin/createLehrer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lehrer),
        credentials: 'include',
      })
      await this.fetchLehrer()
    },

    async deleteAbstimmung(id: number) {
      await fetch(`${baseUrl}/admin/abstimmung/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      await this.fetchAbstimmungen()
    },
    async deleteLehrer(id: number) {
      await fetch(`${baseUrl}/admin/lehrer/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      await this.fetchLehrer()
    },
    async uploadLehrerPhoto(id: number, photoBase64: string) {
      await fetch(`${baseUrl}/admin/lehrer/${id}/photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photo: photoBase64 }),
        credentials: 'include',
      })
      await this.fetchLehrer()
    },
    async deleteLehrerPhoto(id: number) {
      await fetch(`${baseUrl}/admin/lehrer/${id}/photo`, {
        method: 'DELETE',
        credentials: 'include',
      })
      await this.fetchLehrer()
    },
  },
})
