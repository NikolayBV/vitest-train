export interface Post {
  userId: number
  id: number
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
