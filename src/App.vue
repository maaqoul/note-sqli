<script setup>
import { useNotesStore } from '@/stores/notes'

const store = useNotesStore()

store.fetchNotes()
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
