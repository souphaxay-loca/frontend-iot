<template>
  <aside
    class="mt-6 fixed md:static w-64 h-full bg-white border-r border-gray-100 transform transition-all duration-300 ease-out"
    :class="
      isOpen
        ? 'translate-x-0 shadow-xl md:shadow-none'
        : '-translate-x-full md:translate-x-0'
    "
    style="z-index: 40"
  >
    <div class="mt-2 p-4 border-b border-gray-100 md:hidden">
      <button
        @click="emit('update:isOpen', false)"
        class="flex items-center text-gray-500 hover:text-gray-600 ml-auto"
      >
        <span class="text-sm mr-2">Close</span>
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <nav class="p-4">
      <router-link
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        class="flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:pl-6 group"
        :class="{
          'bg-blue-50 text-blue-600 border-l-4 border-blue-500 pl-6': isActive(
            link.path
          ),
          'text-gray-600 hover:text-blue-600': !isActive(link.path),
        }"
        @click="handleLinkClick"
      >
        <component
          :is="link.icon"
          class="w-5 h-5 mr-3"
          :class="{
            'text-blue-500': isActive(link.path),
            'text-gray-400 group-hover:text-blue-500': !isActive(link.path),
          }"
        />
        <span class="text-sm font-medium">{{ link.name }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { useRoute } from "vue-router";
import { defineEmits } from "vue";
import { ChartBarIcon, ClockIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(["update:isOpen"]);

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

const links = [
  { name: "Real-Time", path: "/real-time", icon: ChartBarIcon },
  { name: "Historical", path: "/historical", icon: ClockIcon },
];

const isActive = (path) => route.path === path;

const handleLinkClick = () => {
  if (window.innerWidth < 768) {
    emit("update:isOpen", false);
  }
};
</script>