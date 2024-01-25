import { defineStore } from 'pinia'
import axios from 'axios'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: []
  }),
  getters: {
    // getNoteByID
    getNoteById: (state) => (id) => {
      return state.notes.find((note) => note.id.toString() === id.toString())
    }
  },
  actions: {
    // fetch all notes
    async fetchNotes() {
      try {
        const response = await axios.get('http://localhost:3000/notes')
        this.notes = response.data
      } catch (error) {
        console.error('ERROR Fetching Notes :', error)
      }
    },
    async fetchNoteById(id) {
      try {
        const response = await axios.get(`http://localhost:3000/notes/${id}`)
        return response.data
      } catch (error) {
        console.error('ERROR Fetching Notes :', error)
        return null
      }
    },
    addNote(newNote) {
      const newId = Math.max(...this.notes.map(({ id }) => id)) + 1
      this.notes = [...this.notes, { ...newNote, id: newId.toString() }]
    },
    updateNote(updatedNote) {
      const targetNoteIndex = this.notes.findIndex((note) => note.id === updatedNote.id)
      this.notes[targetNoteIndex] = updatedNote
    },
    deleteNote(targetId) {
      this.notes = this.notes.filter(({ id }) => id !== targetId)
    }
  }
})
