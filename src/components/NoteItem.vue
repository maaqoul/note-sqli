<script setup>
import { useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'
const store = useNotesStore()
const router = useRouter()
const { note } = defineProps({
  note: {
    type: Object,
    required: true
  }
})

//TODO: add logic of edit and Delete
const editNote = () => {
  router.push({ name: 'edit-note', params: { id: note.id } })
}
const deleteNote = () => {
  store.deleteNote(note.id)
}
</script>

<template>
  <div class="p-4 border rounded shadow-sm">
    <h3 class="text-lg font-semibold">{{ note.title }}</h3>
    <p class="text-gray-700">{{ note.content }}</p>
    <div class="mt-4 flex space-x-2">
      <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" @click="editNote">
        Edit
      </button>
      <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" @click="deleteNote">
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped></style>
