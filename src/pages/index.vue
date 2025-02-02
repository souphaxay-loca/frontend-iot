<!-- src/pages/index.vue -->
<script setup>
// This will redirect to /real-time when accessing root path (/)
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.push('/real-time')
})
</script>