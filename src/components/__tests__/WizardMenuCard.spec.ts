import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WizardMenuCard from '../WizardMenuCard.vue'
import PrimeVue from 'primevue/config'
import Card from 'primevue/card'
import Button from 'primevue/button'

describe('WizardMenuCard', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
    icon: 'star',
    color: 'bg-success',
    route: '/test-route',
    visible: true,
  }

  function factory(props = {}) {
    return mount(WizardMenuCard, {
      global: {
        plugins: [PrimeVue],
        components: { Card, Button },
      },
      props: { ...defaultProps, ...props },
    })
  }

  it('renders title, description, and icon', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain(defaultProps.title)
    expect(wrapper.text()).toContain(defaultProps.description)
    const icon = wrapper.find('.wizard-icon')
    expect(icon.exists()).toBe(true)
    expect(icon.classes()).toContain('pi-star')
  })

  it('applies the correct color class', () => {
    const wrapper = factory({ color: 'bg-danger' })
    const header = wrapper.find('[class*=h-36]')
    expect(header.classes()).toContain('bg-danger')
  })

  it('uses default color if none provided', () => {
    const wrapper = factory({ color: undefined })
    const header = wrapper.find('[class*=h-36]')
    expect(header.classes()).toContain('bg-primary')
  })

  it('emits navigate event with route when card is clicked', async () => {
    const wrapper = factory()
    await wrapper.trigger('click')
    expect(wrapper.emitted('navigate')).toBeTruthy()
    expect(wrapper.emitted('navigate')![0]).toEqual([defaultProps.route])
  })

  it('emits navigate event with route when button is clicked', async () => {
    const wrapper = factory()
    const button = wrapper.findComponent(Button)
    await button.trigger('click')
    expect(wrapper.emitted('navigate')).toBeTruthy()
    expect(wrapper.emitted('navigate')![0]).toEqual([defaultProps.route])
  })

  it('does not throw if route is undefined', async () => {
    const wrapper = factory({ route: undefined })
    await wrapper.trigger('click')
    expect(wrapper.emitted('navigate')).toBeTruthy()
    expect(wrapper.emitted('navigate')![0]).toEqual([undefined])
  })

  it('is visible by default', () => {
    const wrapper = factory()
    expect(wrapper.isVisible()).toBe(true)
  })
})
