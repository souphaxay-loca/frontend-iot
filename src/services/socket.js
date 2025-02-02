// src/services/socket.js
import { io } from 'socket.io-client'

class SocketService {
  constructor() {
    this.socket = null
  }

  connect() {
    this.socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:3999', {
      transports: ['websocket'],
      autoConnect: true
    })

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server')
    })

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server')
    })
  }

  onNewData(callback) {
    this.socket?.on('new-data', callback)
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}

export default new SocketService()