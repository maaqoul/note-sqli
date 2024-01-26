import { setActivePinia, createPinia } from 'pinia'
import { useNotesStore } from '../notes'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import axios from 'axios'

vi.mock('axios')

describe('Notes Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })
  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it('fetch notes', async () => {
    const mockNote = {
      id: '1',
      content: 'test content',
      title: 'test title'
    }
    const store = useNotesStore()

    axios.get.mockResolvedValue({ data: [mockNote] })

    expect(store.notes).toStrictEqual([])

    await store.fetchNotes()

    expect(store.notes.length).toBe(1)
    expect(store.notes[0]).toStrictEqual(mockNote)
  })

  it('add note', async () => {
    const mockNote = {
      content: 'test content',
      title: 'test title'
    }
    const mockResponseNoteData = { ...mockNote, id: '1' }
    const store = useNotesStore()

    axios.post.mockResolvedValue({ data: mockResponseNoteData })

    expect(store.notes).toStrictEqual([])
    await store.addNote(mockNote)
    expect(store.notes.length).toBe(1)
    expect(store.notes[0]).toStrictEqual(mockResponseNoteData)
  })

  it('delete note', async () => {
    const mockNote = {
      content: 'test content',
      title: 'test title',
      id: '1'
    }
    const store = useNotesStore()
    store.notes = [mockNote]
    axios.delete.mockResolvedValue({ data: {} })

    await store.deleteNote('1')

    expect(store.notes.length).toBe(0)
    expect(store.notes).toStrictEqual([])
  })

  it('modify note', async () => {
    const mockNote = {
      content: 'test content',
      title: 'test title',
      id: '1'
    }
    const modifiedMockNote = {
      id: '1',
      content: 'test content 2.0',
      title: 'test title 2.0'
    }
    const store = useNotesStore()
    store.notes = [mockNote]
    axios.put.mockResolvedValue({ data: modifiedMockNote })

    expect(store.notes.length).toBe(1)
    expect(store.notes[0]).toStrictEqual(mockNote)

    await store.updateNote(modifiedMockNote)

    expect(store.notes.length).toBe(1)
    expect(store.notes[0]).toStrictEqual(modifiedMockNote)
  })
})
