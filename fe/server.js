import express from 'express'
import http from 'http'
import {Server} from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: true
})

io.on('connection', (socket) => {
  console.log('a client connected')

  socket.on('disconnect', () => {
    console.log('client disconnected')
  })

  socket.on('chatStore:created', (msg) => {
    io.emit('chatStore:created', msg)
  })
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Websocket server is running on port ${PORT}`)
})
