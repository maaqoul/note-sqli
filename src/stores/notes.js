import { defineStore } from 'pinia'
import axios from 'axios'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: []
  }),
  getters: {
    // getNoteByID
    getNoteById: (state) => (id) => {
      return state.notes.find((note) => note.id === id)
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
    }
  }
})
