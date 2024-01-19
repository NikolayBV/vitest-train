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

export const createNoteEntity = ({ title, body, author }: Partial<Note>): Note => {
  return {
    title: title || '',
    body: body || '',
    author: author || '',
    id: new Date().toString(),
    createdAt: new Date()
  }
}

export const updateNoteEntity = (newTitle: string, newBody: string, note: Note): Note => {
  return { ...note, body: newBody, title: newTitle }
}

export const createUserName = (user: User | null | undefined) => {
  return `${user?.family_name} ${user?.given_name}`
}
