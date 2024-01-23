import { describe, expect, test } from 'vitest'
import {
  createNoteEntity,
  createUserName,
  formatUser,
  isPossibleNoteBody,
  sortedNotes,
  updateNoteEntity
} from '@/utils/functions'
import { unsortedNotes, sortNotes } from '@/utils/mocks'

describe('formatUser', () => {
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
})

describe('createNoteEntity', () => {
  test('createNoteEntity should return object of note', () => {
    expect(
      createNoteEntity({ title: 'Test', body: 'Test', author: 'Test', authorId: 'testId' })
    ).toEqual({
      title: 'Test',
      body: 'Test',
      author: 'Test',
      authorId: 'testId',
      createdAt: new Date(),
      id: new Date().getTime()
    })
  })
})

describe('updateNoteEntity', () => {
  test('updateNoteEntity should return update note', () => {
    const note = {
      author: 'Бабкин Николай',
      authorId: 'google-oauth2|102483884126576221391',
      body: 'test0',
      createdAt: new Date('2024-01-22T10:05:43.638Z'),
      id: 1705917943638,
      title: 'test0'
    }
    expect(updateNoteEntity('newTitle', 'newBody', note)).toEqual({
      author: 'Бабкин Николай',
      authorId: 'google-oauth2|102483884126576221391',
      body: 'newBody',
      createdAt: new Date('2024-01-22T10:05:43.638Z'),
      id: 1705917943638,
      title: 'newTitle',
      updatedAt: new Date()
    })
  })
})

describe('createUserName', () => {
  test('createUserName should return full name', () => {
    expect(createUserName({ family_name: 'Nikolai', given_name: 'Babkin' })).toBe('Nikolai Babkin')
  })
})

describe('sortedNotes', () => {
  test('sortedNotes should sorted notes', () => {
    expect(sortedNotes(unsortedNotes)).toEqual(sortNotes)
  })
})

describe('isPossibleNoteBody', () => {
  test('isPossibleNoteBody should return false value', () => {
    expect(isPossibleNoteBody('test1', unsortedNotes)).toBe(false)
  })
  test('isPossibleNoteBody should return true value', () => {
    expect(isPossibleNoteBody('test3', unsortedNotes)).toBe(true)
  })
})
