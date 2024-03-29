import type { IdToken } from '@auth0/auth0-vue'
import type { IHeaderLinks, Note, User } from '@/utils/interfaces'
import { HEADER_LINKS } from '@/utils/constants'

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

export const createNoteEntity = ({ title, body, author, authorId, id, createdAt }: Note): Note => {
  return {
    title: title,
    body: body,
    author: author,
    authorId: authorId,
    id: id,
    createdAt: createdAt
  }
}

export const updateNoteEntity = (newTitle: string, newBody: string, note: Note): Note => {
  return { ...note, body: newBody, title: newTitle, updatedAt: new Date() }
}

export const createUserName = (user: Partial<User> | null | undefined) => {
  if (user?.family_name && user.given_name) {
    return `${user?.family_name} ${user?.given_name}`
  } else {
    return user?.email
  }
}

export const sortedNotes = (unsortedNotes: Note[]): Note[] => {
  const updatedNotes = unsortedNotes
    .filter((item) => item.updatedAt)
    .sort(
      (a, b) => new Date(String(b.updatedAt)).getTime() - new Date(String(a.updatedAt)).getTime()
    )
  const notUpdatedNotes = unsortedNotes.filter((item) => !item.updatedAt)
  return [...updatedNotes, ...notUpdatedNotes]
}

export const isPossibleNoteBody = (
  noteBody: string,
  userNotes: Note[] | undefined
): boolean | undefined => {
  if (userNotes) {
    const findSameText = userNotes.find((item) => item.body === noteBody)
    return !findSameText
  }
}

export const getHeaderLinks = (isAuth: boolean): IHeaderLinks[] => {
  return HEADER_LINKS.filter((link) => (isAuth ? link.isPrivate : !link.isPrivate))
}
