<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'
const store = useNotesStore()
const router = useRouter()
console.log('store :', store)
console.log('router :', router)
const note = ref({
  title: '',
  content: ''
})
function submitNote() {
  store.addNote(note.value)
  router.go(-1)
  console.log('🚀 ~ submitNote ~ note.value:', note.value)
}
</script>

<template>
  <div class="p-4 border rounded shadow-lg">
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
</template>
