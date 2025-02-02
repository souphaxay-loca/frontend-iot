// src/mock/realtimeData.js
export function generateRealtimeData() {
    return {
      timestamp: new Date().toISOString(),
      temperature: 20 + Math.random() * 10, // Random between 20-30°C
      humidity: 50 + Math.random() * 30,    // Random between 50-80%
      mq3: 0.1 + Math.random() * 0.4       // Random between 0.1-0.5 ppm
    }
  }