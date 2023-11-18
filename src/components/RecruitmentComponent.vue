<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores'
const authStore = useAuthStore()

onMounted(async () => {
  authStore.checkAuthentication()
})
</script>

<template>
  <div class="flex flex-col w-full bg-white p-8 gap-2">
    <div class="gap-2">
      <div class="flex justify-between mb-2">
        <h1>Reclutamiento</h1>
        <div class="flex mb-7">
          <div class="h-10 bg-gray-200 rounded-full w-28"></div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="col in 3" :key="col" class="h-6 bg-gray-200 rounded-full col-span-1"></div>
      </div>
    </div>
    <div class="mt-8">
      <div>
        <div class="animate-pulse flex flex-col space-x-4">
          <div class="flex-1 space-y-6 py-1">
            <div class="space-y-3">
              <div class="h-14 bg-gray-50 rounded-full mt-2 flex items-center justify-center">
                <div class="grid grid-cols-6 p-8 gap-4 flex-1">
                  <div
                    v-for="col in 6"
                    :key="col"
                    class="h-6 bg-gray-200 rounded-full col-span-1"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1 space-y-6 py-1">
            <div class="space-y-3">
              <div
                v-for="index in 6"
                :key="index"
                class="px-8 py-2 grid grid-cols-6 gap-4 border-b"
              >
                <div
                  v-for="col in 6"
                  :key="col"
                  class="h-6 bg-gray-200 rounded-full col-span-1"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
h1 {
  @apply text-xl font-semibold;
}
p {
  @apply text-gray-600;
}
</style>
