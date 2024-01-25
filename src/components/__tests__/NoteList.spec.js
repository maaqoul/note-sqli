import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useRouter } from 'vue-router'

import NoteList from '../NoteList.vue'
import NoteItem from '../NoteItem.vue'

vi.mock('axios')
vi.mock('vue-router')

describe('NoteList', () => {
  useRouter.mockReturnValue({
    push: vi.fn()
  })
  beforeEach(() => {
    useRouter().push.mockReset()
  })
  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it('renders properly', async () => {
    const mockNote = {
      id: '1',
      content: 'test content',
      title: 'test title'
    }
    const wrapper = mount(NoteList, {
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

    const items = wrapper.findAllComponents(NoteItem)
    expect(items.length).toBe(1)
  })
})
