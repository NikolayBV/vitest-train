import type { IdToken } from '@auth0/auth0-vue'
import type { Note, User } from '@/utils/interfaces'

export const formatUser = ({
  family_name = '',
  given_name = '',
  email = '',
  picture = '',
  role = 'user',
  sub
}: IdToken): User => ({
  family_name,
  given_name,
  email,
  role,
  picture,
  sub
})

export const createNoteEntity = ({ title, body, author, authorId }: Partial<Note>): Note => {
  return {
    title: title || '',
    body: body || '',
    author: author || '',
    authorId: authorId || '',
    id: new Date().getTime(),
    createdAt: new Date()
  }
}

export const updateNoteEntity = (newTitle: string, newBody: string, note: Note): Note => {
  return { ...note, body: newBody, title: newTitle, updatedAt: new Date() }
}

export const createUserName = (user: User | null | undefined) => {
  return `${user?.family_name} ${user?.given_name}`
}
