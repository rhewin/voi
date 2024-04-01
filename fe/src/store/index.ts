import { defineStore } from 'pinia'
import { socket } from '@/socket'

export const useChatStore = defineStore('chatStore', {
  state: () => ({
    data: [] as any[]
  }),
  actions: {
    bindEvents() {
       socket.on('connect', () => {
         socket.emit('chatStore:list', (res: any) => {
           this.data = res.data
         })
       })

      socket.on('chatStore:created', (data: any) => {
        if (this.data != null) {
          this.data = data
        }
      })
    },
    setData(data: any) {
      this.data = data
      socket.emit('chatStore:created', this.data, () => {})
    }
  }
})
