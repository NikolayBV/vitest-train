import { vi } from 'vitest'

export const sortNotes = [
  {
    author: 'Бабкин Николай',
    authorId: 'google-oauth2|102483884126576221391',
    body: 'test0',
    createdAt: new Date('2024-01-22T10:06:43.638Z'),
    id: 1705917943640,
    title: 'test0',
    updatedAt: new Date('2024-01-22T11:10:43.638Z')
  },
  {
    author: 'Бабкин Николай',
    authorId: 'google-oauth2|102483884126576221391',
    body: 'test1',
    createdAt: new Date('2024-01-22T10:08:43.638Z'),
    id: 1705917943638,
    title: 'test1'
  },
  {
    author: 'Бабкин Николай',
    authorId: 'google-oauth2|102483884126576221391',
    body: 'test2',
    createdAt: new Date('2024-01-22T10:07:43.638Z'),
    id: 1705917943639,
    title: 'test2'
  }
]
export const unsortedNotes = [
  {
    author: 'Бабкин Николай',
    authorId: 'google-oauth2|102483884126576221391',
    body: 'test1',
    createdAt: new Date('2024-01-22T10:08:43.638Z'),
    id: 1705917943638,
    title: 'test1'
  },
  {
    author: 'Бабкин Николай',
    authorId: 'google-oauth2|102483884126576221391',
    body: 'test2',
    createdAt: new Date('2024-01-22T10:07:43.638Z'),
    id: 1705917943639,
    title: 'test2'
  },
  {
    author: 'Бабкин Николай',
    authorId: 'google-oauth2|102483884126576221391',
    body: 'test0',
    createdAt: new Date('2024-01-22T10:06:43.638Z'),
    id: 1705917943640,
    title: 'test0',
    updatedAt: new Date('2024-01-22T11:10:43.638Z')
  }
]

export const testNote = {
  author: 'Бабкин Николай',
  authorId: 'google-oauth2|102483884126576221391',
  body: 'test0',
  createdAt: new Date('2024-01-22T10:05:43.638Z'),
  id: 1705917943638,
  title: 'test0'
}

vi.mock('vue-hooks-form', async (importOriginal) => {
  return {
    useForm: {
      useField: vi.fn()
    }
  }
})
