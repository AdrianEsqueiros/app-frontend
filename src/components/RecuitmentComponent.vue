<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useAuthStore, useListStore } from '@/stores'
import CustomTable from './customComponents/CustomTable.vue'
const authStore = useAuthStore()
const totalPages = ref(0)

onMounted(async () => {
  authStore.checkAuthentication()
  try {
    // await listStore.fetchData(10, 1)
    totalPages.value = total(listStore.totalPages, 10)
  } catch (error: any) {
    console.error('Error al cargar la lista de empleados:', error.message)
  }
})
const total = (total: number, perPage: number) => {
  return Math.ceil(total / perPage)
}
const listStore = useListStore()

const isLoaded = computed(() => listStore.isDataLoaded)

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
    <div class="">
      <CustomTable class=""  :isloaded="!isLoaded" />
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
.download-btn {
  @apply bg-white text-gray-900 border border-gray-900 h-14 px-6;
}
.plus-btn {
  @apply bg-gray-900 text-white  h-14 px-6;
}
.pagination {
  @apply mt-4 flex items-center justify-center space-x-2;
}

.pagination button {
  @apply px-2 py-1 rounded-md bg-gray-50 cursor-pointer;
}

.pagination button:disabled {
  @apply bg-gray-300 cursor-not-allowed;
}
</style>
