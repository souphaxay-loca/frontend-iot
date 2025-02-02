// src/mock/historicalData.js
export function generateHistoricalData(hours = 24) {
    const data = []
    const now = new Date()
    
    for (let i = hours; i >= 0; i--) {
      const timestamp = new Date(now - i * 3600000) // Subtract hours
      data.push({
        timestamp: timestamp.toISOString(),
        temperature: 20 + Math.random() * 10,
        humidity: 50 + Math.random() * 30,
        mq3: 0.1 + Math.random() * 0.4
      })
    }
    
    return data
  }