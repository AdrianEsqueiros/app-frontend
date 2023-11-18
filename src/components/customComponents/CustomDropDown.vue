<script setup lang="ts">
import { ref } from 'vue'
import IconDownArrow from '../icons/IconDownArrow.vue'

const props = defineProps(['value', 'id', 'placeholder', 'options'])
const emits = defineEmits(['update:modelValue'])

const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const selectOption = (option: string) => {
  emits('update:modelValue', option)
  showDropdown.value = false
}
</script>

<template>
  <div class="w-full">
    <!-- Dropdown Trigger Button -->
    <button @click="toggleDropdown" class="dropdown-trigger">
      <div>
        {{ props.value || props.placeholder }}
      </div>
      <div class="">
        <IconDownArrow />
      </div>
    </button>

    <!-- Dropdown -->
    <div v-if="showDropdown" class="dropdown">
      <ul>
        <li v-for="(option, index) in props.options" :key="index" @click="selectOption(option)">
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.dropdown-trigger {
  @apply flex p-4 gap-4 justify-between items-center rounded border w-full sm:text-sm sm:leading-5 text-gray-900;
  transition: border-color 0.3s;
  width: 100%;
}

.dropdown {
  @apply absolute w-full mt-1 bg-white rounded-md shadow-lg;
  z-index: 1000;
}

.dropdown ul {
  @apply py-1 overflow-auto text-base leading-6 rounded-md shadow-sm max-h-32 focus:outline-none sm:text-sm sm:leading-5;
}

.dropdown li {
  @apply cursor-pointer select-none relative py-2 pl-3 pr-9;
}

.dropdown li:hover {
  @apply bg-gray-600 text-white;
}
</style>
