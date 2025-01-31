import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import StatsView from '@/views/StatsView.vue'

describe('HelloWorld', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = mount(StatsView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
    expect(wrapper).toBeDefined()
  })
})
