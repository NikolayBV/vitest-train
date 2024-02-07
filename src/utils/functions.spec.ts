import { describe, expect, it } from 'vitest'
import {
  createNoteEntity,
  createUserName,
  formatUser,
  isPossibleNoteBody,
  sortedNotes,
  updateNoteEntity
} from '@/utils/functions'
import { unsortedNotes, sortNotes, testNote } from '@/utils/mocks'

describe('formatUser', () => {
  it('formatUser return object', () => {
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

  it('formatUser return empty object', () => {
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

  it('formatUser return admin user', () => {
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
  it('createNoteEntity should return object of note', () => {
    expect(
      createNoteEntity({
        title: 'Test',
        body: 'Test',
        author: 'Test',
        authorId: 'testId',
        id: new Date('2024-01-22T10:05:43.638Z').getTime(),
        createdAt: new Date('2024-01-22T10:05:43.638Z')
      })
    ).toMatchObject({
      title: 'Test',
      body: 'Test',
      author: 'Test',
      authorId: 'testId',
      createdAt: new Date('2024-01-22T10:05:43.638Z'),
      id: new Date('2024-01-22T10:05:43.638Z').getTime()
    })
  })
})

describe('updateNoteEntity', () => {
  it('updateNoteEntity should return update note', () => {
    expect(updateNoteEntity('newTitle', 'newBody', testNote)).toStrictEqual({
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
  it('createUserName should return full name', () => {
    expect(createUserName({ family_name: 'Nikolai', given_name: 'Babkin' })).toBe('Nikolai Babkin')
  })
})

describe('sortedNotes', () => {
  it('sortedNotes should sorted notes', () => {
    expect(sortedNotes(unsortedNotes)).toEqual(sortNotes)
  })
})

describe('isPossibleNoteBody', () => {
  it('isPossibleNoteBody should return false value', () => {
    expect(isPossibleNoteBody('test1', unsortedNotes)).toBe(false)
  })
  it('isPossibleNoteBody should return true value', () => {
    expect(isPossibleNoteBody('test3', unsortedNotes)).toBe(true)
  })
})
