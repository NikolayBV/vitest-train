import { beforeEach, describe, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CreateNoteCard from '@/components/CreateNoteCars/CreateNoteCard.vue'

describe('createNoteCard', () => {
  beforeEach(() => {
    vi.mock('vue-hooks-form', async (importOriginal) => {
      const mod = await importOriginal<typeof import('vue-hooks-form')>()
      const useForm = vi.fn(() => {
        const useField = vi.fn(() => ({
          ref: vi.fn()
        }))
        return useField
      })
      return {
        ...mod,
        useForm
      }
    })
  })
  it('createNoteCard should render', () => {
    mount(CreateNoteCard)
  })
})
