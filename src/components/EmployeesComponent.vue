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
import IconUpArrow from './icons/IconUpArrow.vue'
import IconDownArrow from './icons/IconDownArrow.vue'
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

const total = computed(() => listStore.total)
const totalPages = computed(() => listStore.totalPages)
const currentPage = computed(() => listStore.currentPage)
const isLoaded = computed(() => listStore.isDataLoaded)
const dataList = computed(() => listStore.filteredDataList)
const datum = computed(() => listStore.datum)
const filterOptions = computed(() => listStore.optionsFilter)
const visiblePages = computed(() => {
  const totalVisiblePages = 5
  const totalPagesValue = totalPages.value
  const currentPageValue = currentPage.value

  let startPage = Math.max(1, currentPageValue - Math.floor(totalVisiblePages / 2))
  let endPage = Math.min(startPage + totalVisiblePages - 1, totalPagesValue)
  if (endPage - startPage + 1 < totalVisiblePages) {
    startPage = Math.max(1, endPage - totalVisiblePages + 1)
  }

  const pages = []

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return pages
})

const changeItemsPerPage = async (value: any) => {
  itemsPerPage.value = value
  try {
    await listStore.fetchData(itemsPerPage.value, 1)
    clearFilters()
  } catch (error: any) {
    console.error('Error al cargar la lista de empleados:', error.message)
  }
}

const handlePageChange = async (increment: number, page: number = currentPage.value) => {
  try {
    if (page !== currentPage.value) {
      await listStore.fetchData(itemsPerPage.value, page)
      listStore.currentPage = page
    } else {
      await listStore.fetchData(itemsPerPage.value, increment)
    }
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

const removeItem = (value: any) => {
  listStore.removeItem(value)
}

const editItem = (value: any) => {
  listStore.editItem(value)
  console.log(datum.value)
}
</script>

<template>
  <div class="container">
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
              dropDirection="top-14"
              placeholder="Nombre de cargo"
              :value="selectedValue"
              :options="filterOptions"
              @update:modelValue="updateSelectedValue"
            >
              <IconDownArrow />
            </CustomDropDown>
          </div>
        </div>
      </div>
      <CustomTable
        :datalist="dataList"
        :isloaded="isLoaded"
        @edit:edit-item="editItem"
        @remove:remove-item="removeItem"
      />
    </div>
    <div class="grid grid-cols-2 gap-4 items-center" v-if="totalPages > 1">
      <div class="flex col-span-1 gap-2 justify-center">
        <div class="flex items-center justify-center">
          <CustomButton
            customClass="custom-arrow "
            @click="handlePageChange(listStore.changePage(-1))"
            :disabled="currentPage === 1"
          >
            <IconLeftArrow />
          </CustomButton>

          <div v-for="item in visiblePages" :key="item">
            <CustomButton
              :customClass="item === currentPage ? 'is-active' : 'm-2 py-2 px-4 text-gray-900'"
              @click="handlePageChange(0, item)"
              :disabled="currentPage === item"
              :active="item === currentPage"
            >
              {{ item }}
            </CustomButton>
          </div>

          <CustomButton
            customClass="custom-arrow"
            @click="handlePageChange(listStore.changePage(1))"
            :disabled="currentPage === totalPages"
          >
            <IconRightArrow />
          </CustomButton>
        </div>
      </div>

      <div class="col-span-1 flex justify-end">
        <div class="flex items-center justify-between gap-4">
          <span class="text-gray-500"
            >Mostrando {{ dataList.length ? 1 : 0 }} a {{ dataList.length }} de
            {{ total }} registros
          </span>
          <CustomDropDown
            dropDirection="-top-28"
            :value="itemsPerPage"
            :options="countPerPage"
            @update:modelValue="updatePerPage"
            label="Mostrar"
          >
            <IconUpArrow />
          </CustomDropDown>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  @apply flex flex-col bg-white p-8 w-full m-4 gap-2;
  border-width: 3px;
  border-radius: 20px;
  border-color: transparent;
}
.footer {
  @apply mt-4 flex items-center justify-center;
}
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
.custom-arrow {
  @apply border px-2 my-2 border-gray-200;
}
.is-active {
  @apply m-2 py-2 px-4 bg-gray-100 text-gray-900 rounded-2xl;
}
</style>
