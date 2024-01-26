import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useRouter } from 'vue-router'

import NoteView from '../NoteView.vue'
import { useNotesStore } from '@/stores/notes'

vi.mock('axios')
vi.mock('vue-router')

describe('NoteView', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      push: vi.fn(),
      go: vi.fn(),
      currentRoute: { value: { params: { id: '1' } } }
    })
  })
  afterEach(() => {
    useRouter().push.mockReset()
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it('renders properly', async () => {
    const mockNote = {
      id: '1',
      content: 'test content',
      title: 'test title'
    }
    const wrapper = mount(NoteView, {
      global: {
        stubs: ['RouterLink'],
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              notes: { notes: [mockNote] }
            }
          })
        ]
      }
    })

    expect(wrapper.exists()).toBeTruthy()
  })

  it('dispatch update note properly', async () => {
    const mockNote = {
      id: '1',
      content: 'test content',
      title: 'test title'
    }
    const modifiedMockNote = {
      ...mockNote,
      title: 'test title 2'
    }
    const wrapper = mount(NoteView, {
      global: {
        stubs: ['RouterLink'],
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              notes: { notes: [mockNote] }
            }
          })
        ]
      }
    })
    const store = useNotesStore()
    const router = useRouter()

    await wrapper.get('input').setValue(modifiedMockNote.title)
    await wrapper.get('form').trigger('submit')

    expect(store.updateNote).toBeCalledTimes(1)
    expect(store.updateNote).toBeCalledWith(modifiedMockNote)
    expect(router.go).toBeCalledTimes(1)
    expect(router.go).toBeCalledWith(-1)
  })
})
