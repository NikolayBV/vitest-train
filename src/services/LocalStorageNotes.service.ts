import type { Note } from '@/utils/interfaces'
import { isPossibleNoteBody, sortedNotes } from '@/utils/functions'

class LocalStorageNotesService {
  private storage: Storage
  constructor() {
    this.storage = localStorage
  }

  getNotes(userId: string | undefined, userRole?: string | null) {
    const storageNotes = this.storage.getItem('notes')
    if (storageNotes && userId) {
      if (userRole === 'admin') {
        return sortedNotes(JSON.parse(storageNotes))
      } else {
        const userNotes = JSON.parse(storageNotes).filter(
          (item: Note) => item.authorId === userId
        ) as Note[]
        return sortedNotes(userNotes)
      }
    } else {
      return []
    }
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

  updateNote(note: Note) {
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
