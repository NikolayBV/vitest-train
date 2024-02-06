<script lang="ts">
import { defineComponent, type PropType, ref, watchEffect } from 'vue'
import type { Note } from '@/utils/interfaces'
import ModalLayout from '@/components/ModalLayout/ModalLayout.vue'
import CreateNoteCard from '@/components/CreateNoteCard/CreateNoteCard.vue'
import { useUserStore } from '@/store/user/UserStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'NoteItem',
  components: { CreateNoteCard, ModalLayout },
  emits: ['handleUpdateItem', 'handleDeleteNote'],
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  setup(props, { emit }) {
    const userStore = useUserStore()
    const { getUserState, getUserRole } = storeToRefs(userStore)
    const isAuthorNote = ref()
    const isAdmin = ref()
    const isEditModal = ref<boolean>(false)
    const changeModalState = () => {
      isEditModal.value = !isEditModal.value
    }
    const handleUpdateItem = (note: Note) => {
      emit('handleUpdateItem', note)
    }
    const handleDeleteNote = (id: number) => {
      emit('handleDeleteNote', id)
    }
    watchEffect(() => {
      isAuthorNote.value = props.note.authorId === getUserState.value?.sub
      isAdmin.value = getUserRole.value === 'admin'
    })
    return {
      isEditModal,
      changeModalState,
      handleUpdateItem,
      handleDeleteNote,
      isAuthorNote,
      isAdmin
    }
  }
})
</script>

<template>
  <ModalLayout :close-modal="changeModalState" v-show="isEditModal">
    <CreateNoteCard @click.stop :note="note" :is-edit-note="true" @updatedNote="handleUpdateItem" />
  </ModalLayout>
  <div class="post-wrapper">
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
      <button v-show="isAuthorNote" @click="changeModalState">Edit</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.post-wrapper {
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: bisque;
  padding: 10px;
  border: 1px solid;
  border-radius: 5px;
  margin-top: 20px;
}
.button-wrapper {
  width: 50%;
  display: flex;
  justify-content: space-between;
}
</style>
