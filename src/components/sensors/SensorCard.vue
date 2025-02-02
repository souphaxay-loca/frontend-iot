<!-- src/components/sensors/SensorCard.vue -->
<template>
    <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <span 
          class="w-3 h-3 rounded-full"
          :class="statusColor"
        ></span>
      </div>
      
      <div class="flex items-baseline space-x-2">
        <span class="text-3xl font-bold">{{ formattedValue }}</span>
        <span class="text-gray-500">{{ unit }}</span>
      </div>
      
      <div class="mt-4 text-sm text-gray-500">
        Last updated: {{ formatTime(lastUpdate) }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { formatDistanceToNow } from 'date-fns'
  
  const props = defineProps({
    title: String,
    value: Number,
    unit: String,
    status: String,
    lastUpdate: {
      type: Date,
      default: () => new Date()
    }
  })
  
  const statusColor = computed(() => {
    const colors = {
      normal: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500'
    }
    return colors[props.status] || colors.normal
  })
  
  const formattedValue = computed(() => {
    return props.value?.toFixed(1) || '0'
  })
  
  const formatTime = (date) => {
    return formatDistanceToNow(date, { addSuffix: true })
  }
  </script>