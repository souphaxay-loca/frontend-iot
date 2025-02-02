<template>
  <header class="bg-white border-b border-gray-100 shadow-md fixed w-full z-50">
    <div class="px-6 py-4">
      <div class="flex justify-between items-center gap-4">
        <!-- Left side -->
        <div class="flex items-center gap-4">
          <!-- Mobile menu button -->
          <button 
            class="md:hidden p-2 rounded-lg hover:bg-gray-50 active:scale-95 transition-transform"
            @click="$emit('toggle-sidebar')"
            aria-label="Toggle navigation menu"
          >
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            IoT Dashboard
          </h1>
        </div>
        
        <!-- Right side -->
        <div class="flex items-center gap-4">
          <!-- Status Indicator -->
          <div class="relative flex items-center gap-2">
            <div 
              class="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
              :class="isConnected ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'"
            >
              <span 
                class="w-2 h-2 rounded-full animate-pulse"
                :class="isConnected ? 'bg-green-500' : 'bg-red-500'"
              ></span>
              {{ isConnected ? 'Connected' : 'Offline' }}
            </div>
            
            <!-- Timestamp -->
            <div class="hidden md:block text-sm text-gray-500 border-l pl-4 border-gray-100">
              Last update: {{ formattedTime }}
            </div>
          </div>
          
          <!-- Notification/System Indicator -->
          <button 
            class="p-2 rounded-lg hover:bg-gray-50 relative"
            aria-label="System notifications"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span 
              v-if="unreadNotifications"
              class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"
            ></span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'

defineProps({
  isConnected: {
    type: Boolean,
    default: true
  },
  unreadNotifications: {
    type: Number,
    default: 0
  },
  lastUpdate: {
    type: Date,
    default: () => new Date()
  }
})

defineEmits(['toggle-sidebar'])

const formattedTime = computed(() => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date())
})
</script>