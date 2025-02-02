// src/pages/test.vue
<template>
  <div class="space-y-6 p-4">
    <div class="bg-white rounded-lg p-4 shadow">
      <h2 class="text-xl font-bold mb-4">Backend Connection Test</h2>
      <div class="space-y-2">
        <p>
          Connection Status:
          <span :class="isConnected ? 'text-green-500' : 'text-red-500'">
            {{ isConnected ? "Connected" : "Disconnected" }}
          </span>
        </p>
        <p>Last Real-time Data:</p>
        <pre class="bg-gray-100 p-2 rounded">{{ realTimeData }}</pre>
      </div>
    </div>

    <div class="bg-white rounded-lg p-4 shadow">
      <h2 class="text-xl font-bold mb-4">Mock Data Test</h2>
      <div class="space-y-2">
        <p>Mock Data Sample:</p>
        <pre class="bg-gray-100 p-2 rounded">{{ mockData }}</pre>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div class="bg-white rounded-lg p-4 shadow h-[500px]">
        <h3 class="text-lg font-semibold mb-4">Real Backend Chart</h3>
        <div class="h-[calc(100%-28px)]">
          <!-- Subtract heading height -->
          <SensorChart :data="historicalData" sensorType="temperature" />
        </div>
      </div>
      <div class="bg-white rounded-lg p-4 shadow h-[500px]">
        <h3 class="text-lg font-semibold mb-4">Mock Data Chart</h3>
        <div class="h-[calc(100%-28px)]">
          <SensorChart :data="mockHistoricalData" sensorType="temperature" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SensorChart from "../components/sensors/SensorChart.vue";
import { useSensorData } from "../composables/useSensorData";
import { useSensorDataTest } from "../composables/useSensorDataTest";
import { generateMockHistoricalData } from "../../src/mock/sensorDataMock.js";

// Real data
const { realTimeData, historicalData, isConnected } = useSensorData();

// Mock data
const { realTimeData: mockData, historicalData: mockHistoricalData } =
  useSensorDataTest();
</script>