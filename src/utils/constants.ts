import type { IHeaderLinks } from '@/utils/interfaces'

export const APP_CONSTANTS = {
  BASE_URL: 'https://jsonplaceholder.typicode.com'
}

export const EMITS = {
  UPDATE_NOTE: 'updateNote',
  CREATE_NOTE: 'createNote',
  HANDLE_DELETE_NOTE: 'handleDeleteNote',
  HANDLE_UPDATE_NOTE: 'handleUpdateItem'
}

export const COMMON_TEXT = {
  NOTES_HAS_BEEN_CREATED: 'Заметка с таким текстом уже создана'
}

export const ROLES = {
  ADMIN: 'admin'
}

export const HEADER_LINKS: IHeaderLinks[] = [
  {
    title: 'Login',
    href: '/login'
  },
  {
    title: 'Home',
    href: '/',
    isPrivate: true
  },
  {
    title: 'Notes',
    href: '/notes',
    isPrivate: true
  },
  {
    title: 'About',
    href: '/about',
    isPrivate: true
  }
]
