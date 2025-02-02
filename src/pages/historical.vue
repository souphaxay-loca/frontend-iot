<!-- src/pages/historical.vue -->
<template>
    <div class="space-y-6">
      <!-- Date Range Selector -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <label for="time-range" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Time Range
        </label>
        <select
          id="time-range"
          v-model="timeRange"
          class="rounded-lg border px-4 py-2 w-full sm:w-auto bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="1">Last Hour</option>
          <option value="6">Last 6 Hours</option>
          <option value="24">Last 24 Hours</option>
        </select>
      </div>
  
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
  
      <!-- Empty State -->
      <div v-else-if="filteredData.length === 0" class="text-center py-6">
        <p class="text-gray-500 dark:text-gray-400">No historical data available for the selected time range.</p>
      </div>
  
      <!-- Historical Charts -->
      <div v-else class="grid grid-cols-1 gap-6">
        <div
          v-for="type in sensorTypes"
          :key="type"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            {{ getSensorTitle(type) }} History
          </h3>
          <div class="h-80">
            <SensorChart
              :data="filteredData"
              :sensor-type="type"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import SensorChart from '../components/sensors/SensorChart.vue'
  import { useSensorData } from '../composables/useSensorData'
  
  const { historicalData } = useSensorData()
  const timeRange = ref(24)
  const sensorTypes = ['temperature', 'humidity', 'mq3']
  const loading = ref(false) // Set to false since mock data is instant
  
  // Filter data based on the selected time range
  const filteredData = computed(() => {
    const hours = parseInt(timeRange.value)
    const cutoff = new Date(Date.now() - hours * 3600000)
    return historicalData.value.filter(d => new Date(d.timestamp) > cutoff)
  })
  
  // Helper function to get sensor titles
  function getSensorTitle(type) {
    const titles = {
      temperature: 'Temperature',
      humidity: 'Humidity',
      mq3: 'Alcohol Level'
    }
    return titles[type] || type
  }
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>