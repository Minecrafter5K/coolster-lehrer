import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Header from '@/components/ClHeader.vue'

// Describe block to group related tests for Header component
describe('Header.vue', () => {
  it('renders the title', () => {
    const wrapper = mount(Header)

    // Assert the title is rendered correctly
    expect(wrapper.find('#title').text()).toBe('Coolster Lehrer')
  })

  it('contains two router-links', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub, // Stub the RouterLink component
        },
      },
    })

    const routerLinks = wrapper.findAllComponents(RouterLinkStub)
    expect(routerLinks).toHaveLength(2)
  })

  it('contains Vote button', () => {
    const wrapper = mount(Header)

    // Assert that Vote button is present
    const voteButton = wrapper.find('.btn.vote')
    expect(voteButton.exists()).toBe(true)
    expect(voteButton.text()).toBe('Vote')
  })

  it('contains Stats button', () => {
    const wrapper = mount(Header)

    // Assert that Stats button is present
    const statsButton = wrapper.find('.btn.stats')
    expect(statsButton.exists()).toBe(true)
    expect(statsButton.text()).toBe('Stats')
  })
})
