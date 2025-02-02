
// src/mocks/sensorDataMock.js
export function generateMockHistoricalData(hours = 24) {
    const data = [];
    const now = Date.now();
    
    for (let i = hours; i >= 0; i--) {
      data.push({
        timestamp: new Date(now - i * 60 * 60 * 1000),
        temperature: 20 + Math.random() * 10,
        humidity: 40 + Math.random() * 30,
        mq3: Math.random() * 0.5
      });
    }
    
    return data;
  }