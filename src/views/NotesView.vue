<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from 'vue'
import type { Note } from '@/utils/interfaces'
import LocalStorageNotesService from '@/services/LocalStorageNotes.service'
import NoteItem from '@/components/NoteItem/NoteItem.vue'

export default defineComponent({
  name: 'NotesView',
  components: { NoteItem },
  props: {},
  setup(props, ctx) {
    const storage = new LocalStorageNotesService()
    const notes = ref<Array<Note>>([])

    const handleUpdateItem = (note: Note) => {
      notes.value = notes.value.map((item) => {
        if (item.id === note.id) {
          return note
        } else {
          return item
        }
      })
    }
    const handleDeleteNote = (id: number) => {
      storage.deleteNote(id)
      notes.value = notes.value.filter((item) => item.id !== id)
    }
    watch(
      [notes.value],
      () => {
        notes.value = storage.getNotes()
      },
      { immediate: true }
    )
    return { notes, handleUpdateItem, handleDeleteNote }
  }
})
</script>

<template>
  <div class="notes-container" v-if="notes.length">
    <div class="note-wrapper">
      <NoteItem
        :key="note.id"
        v-for="note in notes"
        :note="note"
        @handleUpdateItem="handleUpdateItem"
        @handleDeleteNote="handleDeleteNote"
      />
    </div>
  </div>
  <div style="display: flex; justify-content: center" v-else>There are no notes</div>
</template>

<style scoped lang="scss">
.notes-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.note-wrapper {
  width: 40%;
}
</style>
