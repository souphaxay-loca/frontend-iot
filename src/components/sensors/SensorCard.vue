// SensorCards container component
<script setup>
import { computed } from 'vue';
import { useSensorData } from '../../composables/useSensorData';
import SensorCard from '../../components/sensors/SensorCard.vue';

const { realTimeData, isConnected } = useSensorData();

// Helper function to determine sensor status based on value
function getSensorStatus(type, value) {
  if (type === 'temperature') {
    return value > 28 ? 'warning' : 'normal';
  }
  if (type === 'humidity') {
    return value > 70 ? 'warning' : 'normal';
  }
  if (type === 'mq3') {
    return value > 0.4 ? 'warning' : 'normal';
  }
  return 'normal';
}

// If connection is lost, override status to error
const getStatus = (type, value) => {
  return isConnected.value ? getSensorStatus(type, value) : 'error';
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <SensorCard
      title="Temperature"
      :value="realTimeData.temperature"
      unit="°C"
      :status="getStatus('temperature', realTimeData.temperature)"
      :lastUpdate="realTimeData.timestamp"
    />
    <SensorCard
      title="Humidity"
      :value="realTimeData.humidity"
      unit="%"
      :status="getStatus('humidity', realTimeData.humidity)"
      :lastUpdate="realTimeData.timestamp"
    />
    <SensorCard
      title="Alcohol Level"
      :value="realTimeData.mq3"
      unit="ppm"
      :status="getStatus('mq3', realTimeData.mq3)"
      :lastUpdate="realTimeData.timestamp"
    />
  </div>
</template>