<script setup>
import { computed } from 'vue'
import { useNotesStore } from '@/stores/notes'

const store = useNotesStore()
const notes = computed(() => store.notes)
if (!notes.value.length) {
  store.fetchNotes()
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
