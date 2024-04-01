import { createRouter, createWebHistory } from 'vue-router'
import PageJoin from '../components/PageJoin.vue'
import PageChat from '../components/PageChat.vue'

const BASE_URL = '';

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes: [
    {
      path: '/',
      name: 'page_join',
      component: PageJoin,
      props: {
        title: 'Join Chatroom'
      }
    },
    {
      path: '/chat',
      name: 'page_chat',
      component: PageChat,
      props: (route) => ({
        title: route.query.title || 'Room ID',
        username: route.query.username || '',
        roomid: route.query.roomid || ''
      })
    }
  ]
})

export default router
