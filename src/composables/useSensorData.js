// src/composables/useSensorData.js
import { ref, onMounted, onUnmounted } from 'vue'
import mockSocket from '../services/mockSocket'
import { generateHistoricalData } from '../mock/historicalData'

export function useSensorData() {
  const realTimeData = ref({
    temperature: 0,
    humidity: 0,
    mq3: 0,
    timestamp: new Date()
  })
  
  const historicalData = ref([])
  const isConnected = ref(false)

  const initializeData = () => {
    // Load initial historical data
    historicalData.value = generateHistoricalData(24)
    isConnected.value = true
  }

  const handleNewData = (data) => {
    realTimeData.value = data
    // Add new data to historical
    historicalData.value.push(data)
    // Keep only last 24 hours
    if (historicalData.value.length > 24 * 12) { // 12 readings per hour
      historicalData.value.shift()
    }
  }

  onMounted(() => {
    initializeData()
    mockSocket.onNewData(handleNewData)
    mockSocket.connect()
  })

  onUnmounted(() => {
    mockSocket.disconnect()
  })

  return {
    realTimeData,
    historicalData,
    isConnected
  }
}