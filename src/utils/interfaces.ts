export interface Note {
  id: string
  createdAt: Date
  updatedAt: Date
  author: string
  text: string
}

export interface User {
  email: string
  family_name: string
  given_name: string
  picture: string
  role: string
  sub: string
}
