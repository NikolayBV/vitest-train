import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ModalLayout from '@/components/ModalLayout/ModalLayout.vue'

describe('ModalLayout', () => {
  it('ModalLayout should render with slots and props', () => {
    const closeModalStub = vi.fn()
    const wrapper = mount(ModalLayout, {
      props: {
        closeModal: closeModalStub
      },
      slots: {
        default: 'Create Note'
      }
    })
    expect(wrapper.html()).toContain('Create Note')
    expect(closeModalStub).not.toHaveBeenCalled()
  })
})
