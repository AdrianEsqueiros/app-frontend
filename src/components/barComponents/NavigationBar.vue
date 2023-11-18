<script setup lang="ts">
import { computed } from 'vue'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuthentication()
})
const userInitials = computed(() => {
  const userName = authStore.user?.nombre || ''
  if (userName) {
    return userName
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('')
  } else {
    return ''
  }
})

const userBackgroundColor = '#EB6F25'
</script>

<template>
  <div class="navbar py-5 px-9">
    <div class="flex items-center">
      <div class="user-initials" :style="{ backgroundColor: userBackgroundColor }">
        {{ userInitials }}
      </div>
      <div class="ml-2">
        <div class="font-bold">{{ authStore.user?.nombre }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  @apply flex justify-end items-center  border-b-2 border-gray-300;
}

.logo {
  @apply text-xl font-bold;
}

.user-initials {
  @apply w-8 h-8 flex items-center justify-center rounded-full text-white font-bold;
}
</style>
