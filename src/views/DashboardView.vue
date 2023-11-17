<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SideBar from '@/components/barComponents/SideBar.vue'
import NavigationBar from '../components/barComponents/NavigationBar.vue'
import IconDashboard from '../components/icons/IconDashboard.vue'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
const route = useRoute()
const isDashboardRoute = computed(() => route.path === '/dashboard')
</script>
<template>
  <div class="flex">
    <SideBar class="flex w-1/4" />
    <div class="flex flex-col w-full">
      <NavigationBar class="h-20" />
      <div class="flex justify-center bg-gray-50 h-full">
        <div
          v-if="isDashboardRoute"
          class="flex flex-col w-3/4 h-3/4 m-4 text-gray-900 p-2 rounded items-center"
        >
          <h1>
            Hola <span class="text-emerald-400 font-semibold">{{ authStore.user?.nombre }}</span
            >, bienvenido al dashboard.
          </h1>
          <div class="h-3/4 w-3/4">
            <IconDashboard />
          </div>
        </div>
        <RouterView v-else />
      </div>
    </div>
  </div>
</template>
<style scoped>
h1 {
  @apply text-3xl font-semibold;
}
</style>
