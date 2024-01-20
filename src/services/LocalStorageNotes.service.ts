import type { Note } from '@/utils/interfaces'

class LocalStorageNotesService {
  private storage: Storage
  constructor() {
    this.storage = localStorage
  }

  getNotes() {
    const storageNotes = this.storage.getItem('notes')
    return storageNotes?.length ? (JSON.parse(storageNotes) as Note[]) : []
  }

  setNotes(notes: Note[]) {
    try {
      this.storage.setItem('notes', JSON.stringify(notes))
    } catch (e) {
      console.log(e)
    }
  }

  setNote(note: Note) {
    try {
      const storageNotes = this.storage.getItem('notes')
      if (storageNotes) {
        const currentNotes = JSON.parse(storageNotes) as Array<Note>
        this.storage.setItem('notes', JSON.stringify([...currentNotes, note]))
      } else {
        this.storage.setItem('notes', JSON.stringify([note]))
      }
    } catch (e) {
      console.log(e)
    }
  }

  deleteNote(id: number) {
    try {
      const storageNotes = this.storage.getItem('notes')
      if (storageNotes) {
        const currentNotes = JSON.parse(storageNotes) as Array<Note>
        this.storage.setItem('notes', JSON.stringify(currentNotes.filter((item) => item.id !== id)))
      }
    } catch (e) {
      console.log(e)
    }
  }

  changeNote(note: Note) {
    try {
      const storageNotes = this.storage.getItem('notes')
      if (storageNotes) {
        const currentNotes = JSON.parse(storageNotes) as Array<Note>
        this.storage.setItem(
          'notes',
          JSON.stringify(
            currentNotes.map((item) => {
              if (item.id === note.id) {
                return note
              } else {
                return item
              }
            })
          )
        )
      }
    } catch (e) {
      console.log(e)
    }
  }

  clearStorage() {
    this.storage.clear()
  }
}

export default LocalStorageNotesService
