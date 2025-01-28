import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'
describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HomeView)
    expect(wrapper).toBeDefined()
  })
})
