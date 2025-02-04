import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ClSlider from '../ClSlider.vue'

describe('ClSlider Component', () => {
  it('renders the slider input', () => {
    const wrapper = mount(ClSlider, { props: { value: 0 } })
    const slider = wrapper.find('input[type="range"]')
    expect(slider.exists()).toBe(true)
  })

  it('snaps to closest snap point when changed', async () => {
    const wrapper = mount(ClSlider, { props: { value: 0 } })
    const slider = wrapper.find('input[type="range"]')

    await slider.setValue('-1')
    expect((slider.element as HTMLInputElement).value).toBe('-1')

    await slider.setValue('1.8')
    expect((slider.element as HTMLInputElement).value).toBe('2')
  })
})
