import { describe, expect, it } from 'vitest'
import router from '@/router'

describe('Router', () => {
  it('should have the correct routes', () => {
    expect(router.getRoutes().length).toBe(2)
    expect(router.hasRoute('home')).toBe(true)
    expect(router.hasRoute('stats')).toBe(true)
  })

  it('should resolve the home route correctly', async () => {
    await router.push('/')
    expect(router.currentRoute.value.name).toBe('home')
  })

  it('should resolve the stats route correctly', async () => {
    await router.push('/stats')
    expect(router.currentRoute.value.name).toBe('stats')
  })

  it('should return undefined for unknown routes', async () => {
    await router.push('/unknown')
    expect(router.currentRoute.value.matched.length).toBe(0)
  })
})
