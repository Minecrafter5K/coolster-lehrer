import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import router from '@/router'
import { useAdminStore } from '@/stores/admin.ts'

describe('Router', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should have the correct routes', () => {
    expect(router.getRoutes().length).toBe(6)
    expect(router.hasRoute('home')).toBe(true)
    expect(router.hasRoute('jahre')).toBe(true)
    expect(router.hasRoute('stats')).toBe(true)
    expect(router.hasRoute('admin')).toBe(true)
  })

  it('should resolve the home route correctly', async () => {
    await router.push('/')
    expect(router.currentRoute.value.name).toBe('home')
  })

  it('should resolve the stats route correctly', async () => {
    await router.push('/stats')
    expect(router.currentRoute.value.name).toBe('jahre')
  })

  it('should resolve the jahr route correctly', async () => {
    await router.push('/stats/2025')
    expect(router.currentRoute.value.name).toBe('stats')
  })

  it('should resolve the admin route correctly', async () => {
    const adminStore = useAdminStore()
    vi.spyOn(adminStore, 'checkLogin').mockResolvedValue(undefined)
    adminStore.user.isLoggedin = true // Simulate successful login

    await router.push('/admin')
    await router.isReady()
    expect(router.currentRoute.value.name).toBe('admin')
  })

  it('should resolve the login route correctly', async () => {
    await router.push('/login')
    expect(router.currentRoute.value.name).toBe('login')
  })

  it('should resolve the registration route correctly', async () => {
    await router.push('/register')
    expect(router.currentRoute.value.name).toBe('register')
  })

  it('should return undefined for unknown routes', async () => {
    await router.push('/unknown')
    expect(router.currentRoute.value.matched.length).toBe(0)
  })
})
