<script setup>
import { useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'
import { computed } from 'vue'
const store = useNotesStore()
const router = useRouter()
const { id } = router.currentRoute.value.params
const note = computed(() => {
  const storedNote = store.getNoteById(id)
  if (storedNote) return storedNote
  return store.fetchNoteById(id)
})

function submitNote() {
  // todo logic
  store.updateNote(note.value)
  router.go(-1)
}
</script>

<template>
  <div v-if="note !== null" class="p-4 border rounded shadow-lg">
    <form @submit.prevent="submitNote">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          id="title"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="note.title"
        />
      </div>
      <div class="mb-4">
        <label for="content" class="block text-gray-700 text-sm font-bold mb-2">Content</label>
        <textarea
          id="content"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="note.content"
          rows="4"
        />
      </div>
      <button class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
        save
      </button>
      <RouterLink to="/" class="text-white font-bold py-2 px-4 rounded mx-1">cancel</RouterLink>
    </form>
  </div>
  <div v-else>Not found</div>
</template>
