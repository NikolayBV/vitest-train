<template>
  <ModalLayout :close-modal="changeModalState" v-show="isEditModal">
    <CreateNoteCard @click.stop :note="note" :is-edit-note="true" @updatedNote="handleUpdateItem" />
  </ModalLayout>
  <div class="note">
    <h3 data-test="note-title">{{ note.title }}</h3>
    <p data-test="note-body">{{ note.body }}</p>
    <p data-test="note-author">{{ note.author }}</p>
    <p data-test="note-updatedAt" v-show="note.updatedAt">
      Updated {{ new Date(String(note.updatedAt)).toLocaleString() }}
    </p>
    <div class="button-wrapper">
      <button
        data-test="button-delete"
        v-show="isAuthorNote || isAdmin"
        @click="() => handleDeleteNote(note.id)"
      >
        Delete
      </button>
      <button data-test="button-edit" v-show="isAuthorNote" @click="changeModalState">Edit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref } from 'vue'
import type { Note } from '@/utils/interfaces'
import ModalLayout from '@/components/ModalLayout/ModalLayout.vue'
import CreateNoteCard from '@/components/CreateNoteCard/CreateNoteCard.vue'
import { EMITS } from '@/utils/constants'

export default defineComponent({
  name: 'NoteItem',
  components: { CreateNoteCard, ModalLayout },
  emits: [EMITS.HANDLE_UPDATE_NOTE, EMITS.HANDLE_DELETE_NOTE],
  props: {
    isAuthorNote: {
      type: Boolean,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  setup(_, { emit }) {
    const isEditModal = ref<boolean>(false)

    const changeModalState = () => {
      isEditModal.value = !isEditModal.value
    }
    const handleUpdateNote = (note: Note) => {
      emit(EMITS.HANDLE_UPDATE_NOTE, note)
    }
    const handleDeleteNote = (id: number) => {
      emit(EMITS.HANDLE_DELETE_NOTE, id)
    }
    return {
      isEditModal,
      changeModalState,
      handleUpdateItem: handleUpdateNote,
      handleDeleteNote
    }
  }
})
</script>

<style scoped lang="scss">
.note {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: bisque;
  padding: 10px;
  border: 1px solid;
  border-radius: 5px;
  gap: 10px;

  .button-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
}
</style>
