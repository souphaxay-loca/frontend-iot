<!-- src/App.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <Header 
      :is-connected="isConnected"
      @toggle-sidebar="toggleSidebar"
    />
    
    <div class="flex pt-16">
      <Sidebar v-model:is-open="isSidebarOpen" />
      
      <main class="flex-1 p-6 max-w-7xl mx-auto">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../src/components/layout/Header.vue'
import Sidebar from '../src/components/layout/SideBar.vue'

const isConnected = ref(true)
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>