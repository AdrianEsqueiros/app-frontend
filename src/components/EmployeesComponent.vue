<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useAuthStore, useListStore } from '@/stores'
import CustomButton from './customComponents/CustomButton.vue'
import CustomInput from './customComponents/CustomInput.vue'
import CustomTable from './customComponents/CustomTable.vue'
import CustomDropDown from './customComponents/CustomDropDown.vue'
import IconDownload from './icons/IconDownload.vue'
import IconPlus from './icons/IconPlus.vue'
import IconRightArrow from './icons/IconRightArrow.vue'
import IconLeftArrow from './icons/IconLeftArrow.vue'
import IconSearch from './icons/IconSearch.vue'
import IconClearFilter from './icons/IconClearFilter.vue'

const authStore = useAuthStore()
const search = ref('')
const firtsLoad = ref(false)
const selectedValue = ref('')
const listStore = useListStore()
const itemsPerPage = ref(5)
const countPerPage = [5, 15, 30]

onMounted(async () => {
  authStore.checkAuthentication()
  try {
    await listStore.fetchData(5, 1)
    firtsLoad.value = true
    filterList() // Filtrar la lista inicialmente
  } catch (error: any) {
    console.error('Error al cargar la lista de empleados:', error.message)
  }
})

const totalPages = computed(() => listStore.totalPages)
const currentPage = computed(() => listStore.currentPage)
const isLoaded = computed(() => listStore.isDataLoaded)
const dataList = computed(() => listStore.filteredDataList)
const filterOptions = computed(() => listStore.optionsFilter)

const changeItemsPerPage = async (value: any) => {
  itemsPerPage.value = value
  try {
    await listStore.fetchData(itemsPerPage.value, 1)
    clearFilters()
  } catch (error: any) {
    console.error('Error al cargar la lista de empleados:', error.message)
  }
}

const handlePageChange = async (increment: number) => {
  try {
    await listStore.fetchData(itemsPerPage.value, increment)
    clearFilters()
  } catch (error: any) {
    console.error('Error al cargar la lista de empleados:', error.message)
  }
}

const updatePerPage = (value: any) => {
  itemsPerPage.value = value
  changeItemsPerPage(value)
}

const updateSelectedValue = (value: any) => {
  selectedValue.value = value
  filterList()
}
const filterList = () => {
  if (selectedValue.value) {
    listStore.filterByCargo(selectedValue.value)
  } else {
    listStore.resetFilter()
  }
}

const filterSearch = () => {
  if (search.value) {
    listStore.filterBySearch(search.value)
  } else {
    listStore.resetFilter()
  }
}
const clearFilters = () => {
  selectedValue.value = ''
  search.value = ''
  listStore.resetFilter()
}
</script>

<template>
  <div class="flex flex-col bg-white p-8 w-full m-4 gap-2">
    <div v-if="firtsLoad" class="flex justify-between">
      <div class="flex flex-col">
        <h1>Empleados</h1>
        <p>Gestiona tus empleados</p>
      </div>
      <div class="flex gap-3">
        <CustomButton label="Descargar" customClass="download-btn">
          <IconDownload />
        </CustomButton>
        <CustomButton label="Nuevo" customClass="plus-btn">
          <IconPlus />
        </CustomButton>

        <CustomButton @click="clearFilters" customClass="filter-btn ">
          <IconClearFilter />
        </CustomButton>
      </div>
    </div>

    <div v-else class="gap-2">
      <div class="flex justify-between mb-2">
        <h1>Empleados</h1>
        <div class="flex mb-7">
          <div class="h-10 bg-gray-200 rounded-full w-28"></div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4 my-7">
        <div v-for="col in 3" :key="col" class="h-6 bg-gray-200 rounded-full col-span-1"></div>
      </div>
    </div>
    <div>
      <div v-if="firtsLoad" class="grid grid-cols-3 gap-4 my-7 items-end">
        <div class="col-span-2">
          <CustomInput
            v-model="search"
            type="text"
            name="search"
            id="search"
            placeholder="Buscar empleado"
            @input="filterSearch"
          >
            <IconSearch />
          </CustomInput>
        </div>
        <div class="col-span-1">
          <div>
            <CustomDropDown
              placeholder="Nombre de cargo"
              :value="selectedValue"
              :options="filterOptions"
              @update:modelValue="updateSelectedValue"
            />
          </div>
        </div>
      </div>
      <CustomTable class="" :datalist="dataList" :isloaded="isLoaded" />
    </div>
    <div class="pagination" v-if="totalPages > 1">
      <CustomButton
        @click="handlePageChange(listStore.changePage(-1))"
        :disabled="currentPage === 1"
      >
        <IconLeftArrow />
      </CustomButton>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <CustomButton
        @click="handlePageChange(listStore.changePage(1))"
        :disabled="currentPage === totalPages"
      >
        <IconRightArrow />
      </CustomButton>
      <div class="flex">
        <CustomDropDown
        :value="itemsPerPage"
        :options="countPerPage"
        @update:modelValue="updatePerPage"
        />
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
.download-btn {
  @apply bg-white text-gray-900 border border-gray-900 h-14 px-6;
}
.plus-btn {
  @apply bg-gray-900 text-white  h-14 px-6;
}
.filter-btn {
  @apply border px-6 h-14;
  border-color: #e03137;
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
