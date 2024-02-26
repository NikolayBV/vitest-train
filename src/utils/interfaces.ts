export interface Note {
  id: number
  createdAt: Date
  updatedAt?: Date
  authorId: string
  author: string
  title: string
  body: string
}

export interface User {
  email: string
  family_name: string
  given_name: string
  picture: string
  role: string
  sub: string
}

export interface IHeaderLinks {
  title: string
  href: string
  isPrivate?: boolean
}
