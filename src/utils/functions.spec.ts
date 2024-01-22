import { expect, test } from 'vitest'
import { formatUser } from '@/utils/functions'

test('formatUser return object', () => {
  expect(
    formatUser({
      family_name: 'Test',
      given_name: 'Test',
      email: 'test',
      picture: 'test',
      sub: '',
      __raw: 'test',
      sub_jwk: 'test'
    })
  ).toEqual({
    family_name: 'Test',
    given_name: 'Test',
    email: 'test',
    role: 'user',
    sub: '',
    picture: 'test'
  })
})

test('formatUser return empty object', () => {
  expect(
    formatUser({
      family_name: '',
      given_name: '',
      email: '',
      picture: '',
      sub: '',
      __raw: '',
      sub_jwk: ''
    })
  ).toEqual({
    family_name: '',
    given_name: '',
    email: '',
    role: 'user',
    sub: '',
    picture: ''
  })
})

test('formatUser return admin user', () => {
  expect(
    formatUser({
      family_name: 'Test',
      given_name: 'Test',
      email: 'test',
      picture: 'test',
      sub: '',
      role: 'admin',
      __raw: 'test',
      sub_jwk: 'test'
    })
  ).toEqual({
    family_name: 'Test',
    given_name: 'Test',
    email: 'test',
    role: 'admin',
    sub: '',
    picture: 'test'
  })
})
