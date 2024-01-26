<script setup>
import { computed } from 'vue'
import NoteItem from './NoteItem.vue'
import { useNotesStore } from '@/stores/notes'

const store = useNotesStore()
const notes = computed(() => store.notes)
</script>

<template>
  <RouterLink to="/new">Create new note</RouterLink>
  <NoteItem class="space-y-4" v-for="note in notes" :key="note.id" :note="note" />
</template>

<style scoped></style>
