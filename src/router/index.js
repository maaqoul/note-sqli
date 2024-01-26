import { createRouter, createWebHistory } from 'vue-router'
import NoteList from '../components/NoteList.vue'
import NoteEditor from '../components/NoteEditor.vue'
import NoteView from '../components/NoteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NoteList // todo: make this in a home page that has a menu to navigate between sections
    },
    // todo: editor for saving new note
    {
      path: '/new',
      name: 'new-note',
      component: NoteEditor // todo: make this in a home page that has a menu to navigate between sections
    },
    // todo: editor to show or edit a note
    {
      path: '/edit/:id',
      name: 'edit-note',
      component: NoteView // todo: make this in a home page that has a menu to navigate between sections
    }
  ]
})

export default router
