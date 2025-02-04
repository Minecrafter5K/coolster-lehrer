import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import StatsView from '@/views/StatsView.vue'

describe('HelloWorld', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  vi.mock('vue-router', async () => {
    return {
      RouterView: {},
      useRoute: () => {
        return {
          params: {
            abstimmungsId: 1,
          },
        }
      },
    }
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
