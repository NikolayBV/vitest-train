<template>
  <section class="notes">
    <div class="notes__wrapper" v-if="notes.length">
      <NoteItem
        :key="note.id"
        v-for="note in notes"
        :is-author-note="note.authorId === getUserState?.sub"
        :is-admin="getUserRole === ROLES.ADMIN"
        :note="note"
        @handleUpdateItem="handleUpdateItem"
        @handleDeleteNote="handleDeleteNote"
      />
    </div>
    <div class="notes__warning" v-else>There are no notes</div>
    <CreateNoteCard @createNote="handleCreateNote" />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import type { Note } from '@/utils/interfaces'
import LocalStorageNotesService from '@/services/LocalStorageNotes.service'
import NoteItem from '@/components/NoteItem/NoteItem.vue'
import { useUserStore } from '@/store/user/UserStore'
import { storeToRefs } from 'pinia'
import { sortedNotes } from '@/utils/functions'
import CreateNoteCard from '@/components/CreateNoteCard/CreateNoteCard.vue'
import { ROLES } from '@/utils/constants'

export default defineComponent({
  name: 'NotesView',
  computed: {
    ROLES() {
      return ROLES
    }
  },
  components: { CreateNoteCard, NoteItem },
  setup() {
    const userStore = useUserStore()
    const { getUserState, getUserRole } = storeToRefs(userStore)
    const storage = new LocalStorageNotesService(localStorage)
    const notes = ref<Array<Note>>([])
    const handleUpdateItem = (note: Note) => {
      const allNotes = notes.value.map((item) => {
        if (item.id === note.id) {
          return note
        } else {
          return item
        }
      })
      notes.value = sortedNotes(allNotes)
    }
    const handleCreateNote = (note: Note) => {
      notes.value = sortedNotes([...notes.value, note])
    }
    const handleDeleteNote = (id: number) => {
      storage.deleteNote(id)
      notes.value = notes.value.filter((item) => item.id !== id)
    }
    watchEffect(() => {
      const userNotes = storage.getNotes(getUserState.value?.sub, getUserState.value?.role)
      if (userNotes && userNotes.length) {
        notes.value = userNotes
      } else {
        notes.value = []
      }
    })
    return {
      notes,
      handleUpdateItem,
      handleDeleteNote,
      handleCreateNote,
      getUserState,
      getUserRole
    }
  }
})
</script>

<style scoped lang="scss">
.notes {
  margin: 100px 0;
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  &__warning {
    display: flex;
    justify-content: center;
  }
}
</style>
