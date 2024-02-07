import { describe, expect, it } from 'vitest'
import LocalStorageNotesService from '@/services/LocalStorageNotes.service'

describe('LocalStorageNotesService', () => {
  const mockNote = {
    author: 'Бабкин Николай',
    authorId: 'google-oauth2|102483884126576221391',
    body: 'newBody0',
    createdAt: new Date('2024-01-22T10:05:43.638Z'),
    id: 1705917943638,
    title: 'newTitle0',
    updatedAt: new Date('2024-01-23T10:05:43.638Z')
  }
  const mockNotes = [
    mockNote,
    {
      author: 'Бабкин Николай',
      authorId: 'google-oauth2|102483884126576221391',
      body: 'newBody1',
      createdAt: new Date('2024-01-24T10:05:43.638Z'),
      id: 1705917943639,
      title: 'newTitle1',
      updatedAt: new Date('2024-01-25T10:05:43.638Z')
    },
    {
      author: 'Бабкин Николай',
      authorId: 'google-oauth2|102483884126576221391',
      body: 'newBody2',
      createdAt: new Date('2024-01-26T10:05:43.638Z'),
      id: 1705917943640,
      title: 'newTitle2'
    }
  ]
  it('should get notes', () => {
    const storage = new LocalStorageNotesService(localStorage)
    storage.setNote(mockNote)
    expect(storage.getNotes('google-oauth2|102483884126576221391')).toStrictEqual([
      JSON.parse(JSON.stringify(mockNote))
    ])
  })
  it('should delete note', () => {
    const storage = new LocalStorageNotesService(localStorage)
    storage.setNotes(mockNotes)
    storage.deleteNote(1705917943640)
    expect(storage.getNotes('google-oauth2|102483884126576221391')).toHaveLength(2)
  })
  it('should update note', () => {
    const storage = new LocalStorageNotesService(localStorage)
    const updatedNote = {
      author: 'Бабкин Николай',
      authorId: 'google-oauth2|102483884126576221391',
      body: 'newBody22',
      createdAt: new Date('2024-01-26T10:05:43.638Z'),
      id: 1705917943640,
      title: 'newTitle2',
      updatedAt: new Date('2024-01-27T10:05:43.638Z')
    }
    storage.setNotes(mockNotes)
    storage.updateNote(updatedNote)
    expect(
      storage
        .getNotes('google-oauth2|102483884126576221391')
        .find((note) => note.id === updatedNote.id)
    ).toStrictEqual(JSON.parse(JSON.stringify(updatedNote)))
  })
})
