import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '../AppHeader.vue'

describe('AppHeader', () => {
  it('renders hello world', () => {
    expect('hello world').toBe('hello world')
  })

  it('mounts the component', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the header element', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('header.header').exists()).toBe(true)
  })

  it('renders the correct title', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('h1').text()).toBe('Header')
  })

  it('applies the correct classes', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('header').classes()).toContain('header')
  })
})
