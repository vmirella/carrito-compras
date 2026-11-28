import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AsyncState from '../src/components/AsyncState.vue'

const vuetifyStubs = {
  'v-container': { template: '<div><slot /></div>' },
  'v-row': { template: '<div><slot /></div>' },
  'v-col': { template: '<div><slot /></div>' },
  'v-icon': { template: '<span />' },
  'v-progress-circular': { template: '<span class="progress-circular" />' },
  'v-btn': {
    emits: ['click'],
    template: '<button @click="$emit(\'click\')"><slot /></button>'
  }
}

describe('AsyncState', () => {
  it('shows loading state', () => {
    const wrapper = mount(AsyncState, {
      props: { loading: true },
      global: { stubs: vuetifyStubs }
    })

    expect(wrapper.find('.progress-circular').exists()).toBe(true)
  })

  it('shows an error and emits retry', async () => {
    const wrapper = mount(AsyncState, {
      props: { error: new Error('No fue posible cargar') },
      global: { stubs: vuetifyStubs }
    })

    expect(wrapper.text()).toContain('No fue posible cargar')

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('retry')).toHaveLength(1)
  })

  it('renders content when loaded', () => {
    const wrapper = mount(AsyncState, {
      slots: { default: '<div>Contenido cargado</div>' },
      global: { stubs: vuetifyStubs }
    })

    expect(wrapper.text()).toContain('Contenido cargado')
  })
})
