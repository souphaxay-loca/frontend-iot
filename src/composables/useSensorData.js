// src/composables/useSensorData.js
import { ref, computed, onMounted, onUnmounted } from 'vue';
import socketService from '../services/socketService';

export function useSensorData() {
  const realTimeData = ref({
    temperature: 0,
    humidity: 0,
    mq3: 0,
    timestamp: new Date()
  });
  
  const historicalData = ref([]);
  const isConnected = ref(false);
  const loading = ref(true);
  const error = ref(null);

  const socket = socketService.connect();

  // Socket event handlers
  socket.on('connect', () => {
    isConnected.value = true;
    fetchHistoricalData(); // Fetch initial data when connected
  });

  socket.on('disconnect', () => {
    isConnected.value = false;
  });

  socket.on('new-data', (data) => {
    realTimeData.value = data;
    // Add to historical data
    historicalData.value.push(data);
    // Keep the array from growing too large
    if (historicalData.value.length > 288) { // 24 hours of 5-minute readings
      historicalData.value.shift();
    }
  });

  // Fetch historical data
  const fetchHistoricalData = async () => {
    try {
      loading.value = true;
      const response = await fetch('http://localhost:3999/api/sensor-data');
      const data = await response.json();
      historicalData.value = data;
    } catch (err) {
      error.value = 'Failed to fetch historical data';
      console.error('Error fetching historical data:', err);
    } finally {
      loading.value = false;
    }
  };

  // Filter historical data by time range (hours)
  const getFilteredData = (hours) => {
    const cutoff = new Date(Date.now() - hours * 3600000);
    return historicalData.value.filter(d => new Date(d.timestamp) > cutoff);
  };

  onMounted(() => {
    if (!isConnected.value) {
      fetchHistoricalData();
    }
  });

  onUnmounted(() => {
    socketService.disconnect();
  });

  return {
    realTimeData,
    historicalData,
    isConnected,
    loading,
    error,
    getFilteredData
  };
}