import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import CreateNoteCard from '@/components/CreateNoteCars/CreateNoteCard.vue'
import { testNote } from '@/utils/mocks'

describe('createNoteCard', () => {
  it('createNoteCard should renders', () => {
    const wrapper = mount(CreateNoteCard, { props: { note: testNote, isEditNote: true } })
  })
})
