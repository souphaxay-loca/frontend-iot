// src/services/mockSocket.js
import { generateRealtimeData } from '../mock/realtimeData'

class MockSocketService {
  constructor() {
    this.callbacks = new Set()
    this.interval = null
  }

  connect() {
    this.interval = setInterval(() => {
      const data = generateRealtimeData()
      this.callbacks.forEach(callback => callback(data))
    }, 3000) // Send mock data every 3 seconds
  }

  onNewData(callback) {
    this.callbacks.add(callback)
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.callbacks.clear()
  }
}

export default new MockSocketService()