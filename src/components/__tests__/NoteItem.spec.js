import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useRouter } from 'vue-router'

import NoteItem from '../NoteItem.vue'

vi.mock('vue-router')

describe('NoteItem', () => {
  useRouter.mockReturnValue({
    push: vi.fn()
  })

  beforeEach(() => {
    useRouter().push.mockReset()
  })

  it('renders properly', () => {
    const mockNote = {
      id: '1',
      content: 'test content',
      title: 'test title'
    }
    const wrapper = mount(NoteItem, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              notes: []
            }
          })
        ]
      },
      props: {
        note: mockNote
      }
    })

    expect(wrapper.text()).toContain(mockNote.content)
    expect(wrapper.text()).toContain(mockNote.title)
  })
})
