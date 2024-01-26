import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, jest, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import { useNotesStore } from '../notes'
import { beforeEach } from 'vitest'

//Initialize Pinia

const pinia = createPinia()

describe('Notes store', () => {
  let store
  //setting up
  beforeEach(() => {
    // Reset the store before each test
    setActivePinia(pinia)

    // Create new store instance
    store = useNotesStore()
  })

  it('should Fetch all notes from server', async () => {
    // Arrange
    // Mock Axios simulate a successful response
    axios.get = vi.fn(() =>
      Promise.resolve({
        data: [
          {
            id: '1',
            title: 'Meeting Notes 1.2',
            content: 'Discuss project updates and deadlines.'
          }
        ]
      })
    )

    //Act
    // call fetchNotes method

    await store.fetchNotes()

    //Assert
    // Assert the note are populated in the store

    expect(store.notes).toHaveLength(1)
    expect(store.notes[0].title).toBe('Meeting Notes 1.2')
  })

  it('should return a not by ID', () => {
    store.notes = [
      {
        id: '1',
        title: 'Meeting Notes 1.2',
        content: 'Discuss project updates and deadlines.'
      },
      {
        id: '2',
        title: 'To-Do List 2',
        content: 'Buy groceries, complete homework, call John.'
      }
    ]

    const note = store.getNoteById('2')

    expect(note).toEqual({
      id: '2',
      title: 'To-Do List 2',
      content: 'Buy groceries, complete homework, call John.'
    })
  })

  //Todo: please test all other actions

  // tearing down
  afterEach(() => {
    vi.restoreAllMocks() // restore original axios function
  })
})
