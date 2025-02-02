// src/composables/useSensorDataTest.js
import { ref, onMounted } from 'vue';
import { generateMockHistoricalData } from '../../src/mock/sensorDataMock.js';

export function useSensorDataTest() {
  const realTimeData = ref({
    temperature: 25,
    humidity: 50,
    mq3: 0.2,
    timestamp: new Date()
  });
  
  const historicalData = ref([]);
  const isConnected = ref(true);
  const loading = ref(true);

  // Simulate real-time updates
  setInterval(() => {
    realTimeData.value = {
      temperature: 20 + Math.random() * 10,
      humidity: 40 + Math.random() * 30,
      mq3: Math.random() * 0.5,
      timestamp: new Date()
    };
  }, 5000);

  onMounted(() => {
    // Simulate loading historical data
    setTimeout(() => {
      historicalData.value = generateMockHistoricalData(24);
      loading.value = false;
    }, 1000);
  });

  return {
    realTimeData,
    historicalData,
    isConnected,
    loading
  };
}