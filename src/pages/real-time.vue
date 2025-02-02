<!-- src/pages/real-time.vue -->
<template>
    <div class="space-y-6">
      <!-- Sensor Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SensorCard
          v-for="(value, key) in sensorValues"
          :key="key"
          :title="getSensorTitle(key)"
          :value="value"
          :unit="getSensorUnit(key)"
          :status="getSensorStatus(key, value)"
          class="hover:shadow-lg transition-shadow"
        />
      </div>
  
      <!-- Charts -->
      <div class="grid grid-cols-1 gap-6">
        <div
          v-for="type in sensorTypes"
          :key="type"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            {{ getSensorTitle(type) }} History (Last Hour)
          </h3>
          <div class="h-64">
            <SensorChart
              :data="lastHourData"
              :sensor-type="type"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import SensorCard from '../components/sensors/SensorCard.vue'
  import SensorChart from '../components/sensors/SensorChart.vue'
  import { useSensorData } from '../composables/useSensorData'
  
  const { realTimeData, historicalData } = useSensorData()
  
  const sensorTypes = ['temperature', 'humidity', 'mq3']
  
  const sensorValues = computed(() => ({
    temperature: realTimeData.value.temperature,
    humidity: realTimeData.value.humidity,
    mq3: realTimeData.value.mq3
  }))
  
  const lastHourData = computed(() => {
    return historicalData.value.slice(-12) // Last hour (12 * 5 minutes)
  })
  
  function getSensorTitle(type) {
    const titles = {
      temperature: 'Temperature',
      humidity: 'Humidity',
      mq3: 'Alcohol Level'
    }
    return titles[type] || type
  }
  
  function getSensorUnit(type) {
    const units = {
      temperature: '°C',
      humidity: '%',
      mq3: 'ppm'
    }
    return units[type] || ''
  }
  
  function getSensorStatus(type, value) {
    if (type === 'temperature') {
      return value > 28 ? 'warning' : 'normal'
    }
    if (type === 'humidity') {
      return value > 70 ? 'warning' : 'normal'
    }
    if (type === 'mq3') {
      return value > 0.4 ? 'warning' : 'normal'
    }
    return 'normal'
  }
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>