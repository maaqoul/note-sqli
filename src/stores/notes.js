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
    async addNote(newNote) {
      const newId = this.notes.length ? Math.max(...this.notes.map(({ id }) => id)) + 1 : 1
      const newNoteObject = { ...newNote, id: newId.toString() }
      this.notes = [...this.notes, newNoteObject]
      try {
        await axios.post(`http://localhost:3000/notes/`, newNoteObject, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } catch (error) {
        console.error('ERROR Adding Note:', error)
      }
    },
    async updateNote(updatedNote) {
      const targetNoteIndex = this.notes.findIndex((note) => note.id === updatedNote.id)
      this.notes[targetNoteIndex] = updatedNote
      try {
        await axios.put(`http://localhost:3000/notes/${updatedNote.id}`, updatedNote, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } catch (error) {
        console.error('ERROR Editing Note:', error)
      }
    },
    async deleteNote(targetId) {
      this.notes = this.notes.filter(({ id }) => id !== targetId)
      try {
        await axios.delete(`http://localhost:3000/notes/${targetId}`)
      } catch (error) {
        console.error('ERROR Deleting Note:', targetId, error)
      } finally {
        this.fetchNotes()
      }
    }
  }
})
