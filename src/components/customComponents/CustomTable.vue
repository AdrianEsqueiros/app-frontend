<script setup lang="ts">
import { computed, ref } from 'vue'

import CustomButton from '../customComponents/CustomButton.vue'
import IconWatch from '../icons/IconWatch.vue'
import IconEdit from '../icons/IconEdit.vue'
import IconRemove from '../icons/IconRemove.vue'
import CustomModal from './CustomModal.vue'

const headers = ['Nombre', 'Nombre Cargo', 'Departamento', 'Oficina', 'Cuenta']
const columns = [
  { key: 'nombre|correo' },
  { key: 'cargo' },
  { key: 'departamento' },
  { key: 'oficina' },
  { key: 'estadoCuenta' },
  { key: 'acciones' }
]
const show = ref(false)
const props = defineProps(['isloaded', 'datalist', 'datum'])
const emits = defineEmits(['remove:removeItem', 'edit:editItem', 'close:closeModal'])
const isLoaded = computed(() => props.isloaded)
const dataList = computed(() => props.datalist)
const remove = (id: number) => {
  emits('remove:removeItem', id)
}
const edit = (id: number) => {
  emits('edit:editItem', id)
  show.value = true
}
const closeModal = () => {
  emits('close:closeModal')
  show.value = false
}
</script>

<template>
  <div v-if="isLoaded" class="table-container">
    <table class="w-full">
      <thead>
        <tr>
          <th v-for="item in headers" :key="item">{{ item }}</th>
          <th dir="rtl">
            <div class="flex text-end font-bold">Acciones</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in dataList" :key="item.id">
          <td v-for="column in columns" :key="column.key">
            <div v-if="column.key === 'nombre|correo'" class="flex flex-col">
              <div>
                {{ item.nombre }}
              </div>
              <div class="text-gray-500 font-medium">
                {{ item.correo }}
              </div>
            </div>
            <div v-if="column.key === 'acciones'" class="flex gap-4 justify-end">
              <div class="flex gap-4 justify-end">
                <CustomButton>
                  <IconWatch />
                </CustomButton>
                <CustomButton @click="edit(item.id)">
                  <IconEdit />
                </CustomButton>
                <CustomButton @click="remove(item.id)">
                  <IconRemove />
                </CustomButton>
              </div>
            </div>
            <div v-else>{{ item[column.key as keyof typeof item] }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else class="table-container">
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
          <div v-for="index in 7" :key="index" class="px-8 py-2 grid grid-cols-6 gap-4 border-b">
            <div v-for="col in 6" :key="col" class="h-6 bg-gray-200 rounded-full col-span-1"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CustomModal title="Editar" :show="show" @close:close-modal="closeModal" />
</template>

<style scoped>
.table-container {
  @apply overflow-auto;
  height: 470px;
}
td {
  @apply border-b;
}
th,
td {
  @apply text-left py-3 px-4;
}

th {
  @apply sticky top-0 bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold p-4;
  z-index: 1;
}

th:nth-child(1) {
  @apply rounded-s-lg;
}
th:nth-child(6) {
  @apply rounded-s-lg;
}
</style>
