import type { IdToken } from '@auth0/auth0-vue'
import type { User } from '@/utils/interfaces'

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
