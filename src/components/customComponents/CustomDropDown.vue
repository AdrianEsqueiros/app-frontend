<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['value', 'id', 'label', 'placeholder', 'options', 'dropDirection'])
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
  <div class="flex flex-col relative">
    <!-- Dropdown Trigger Button -->
    <div>
      <button @click="toggleDropdown" class="dropdown-trigger">
        <span v-if="label">{{ label }}</span>
        <div>
          {{ props.value || props.placeholder }}
        </div>
        <slot />
      </button>
    </div>
    <div v-if="showDropdown" :class="dropDirection" class="dropdown">
      <ul>
        <li v-for="(option, index) in props.options" :key="index" @click="selectOption(option)">
          {{ option }}
        </li>
      </ul>
    </div>
  </div>

  <!-- Dropdown -->
</template>

<style scoped>
.dropdown-trigger {
  @apply flex p-4 gap-4 justify-between items-center rounded border w-full sm:text-sm sm:leading-5 text-gray-900;
  transition: border-color 0.3s;
  width: 100%;
}

.dropdown {
  @apply bg-white rounded-md shadow-lg absolute  w-full;
  z-index: 1000;
}

.dropdown ul {
  @apply overflow-auto  leading-6 rounded-md shadow-sm max-h-32 focus:outline-none sm:text-sm sm:leading-5;
}

.dropdown li {
  @apply cursor-pointer select-none  py-2 pl-3 pr-9;
}

.dropdown li:hover {
  @apply bg-gray-600 text-white;
}
</style>
