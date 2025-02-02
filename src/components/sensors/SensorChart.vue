<!-- src/components/sensors/SensorChart.vue -->
<template>
    <div class="w-full h-full">
      <Line
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { Line } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  
  const props = defineProps({
    data: {
      type: Array,
      required: true
    },
    sensorType: {
      type: String,
      required: true
    }
  })
  
  const chartData = computed(() => ({
    labels: props.data.map(d => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [{
      label: props.sensorType.charAt(0).toUpperCase() + props.sensorType.slice(1),
      data: props.data.map(d => d[props.sensorType]),
      borderColor: getSensorColor(props.sensorType),
      tension: 0.4
    }]
  }))
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
  
  function getSensorColor(type) {
    const colors = {
      temperature: 'rgb(255, 99, 132)',
      humidity: 'rgb(54, 162, 235)',
      mq3: 'rgb(75, 192, 192)'
    }
    return colors[type] || 'rgb(201, 203, 207)'
  }
  </script>