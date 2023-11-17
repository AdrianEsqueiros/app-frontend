<script setup lang="ts">
import IconEye from '../icons/IconEye.vue'
import IconEyeClosed from '../icons/IconEyeClosed.vue'
import { ref, computed } from 'vue'

const props = defineProps(['label', 'value', 'type', 'name', 'id', 'placeholder', 'error'])
const emits = defineEmits(['update:modelValue'])

const internalValue = ref(props.value)
const isPasswordVisible = ref(false)

const inputType = computed(() => {
  return isPasswordVisible.value ? 'text' : props.type
})

const handleInput = (event: any) => {
  internalValue.value = event.target.value
  emits('update:modelValue', event.target.value)
}

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<template>
  <div>
    <label :for="id" :class="{ 'text-red-500': error }" class="custom-label">
      {{ label }} <span v-if="label" class="text-red-500">*</span>
    </label>
    <div class="div-custom-input">
      <div class="input-container">
        <input
          :value="internalValue"
          @input="handleInput"
          :type="inputType"
          :name="name"
          :id="id"
          class="custom-input"
          :placeholder="placeholder"
          :class="{
            'border-red-500': error && internalValue && internalValue.length > 0,
            'border-green-500': !error && internalValue && internalValue.length > 0
          }"
        />
        <div  class="icon-input">
          <slot/>

        </div>

        <button
          v-if="props.type === 'password'"
          type="button"
          @click="togglePasswordVisibility"
          class="icon-input"
        >
          <IconEye v-if="isPasswordVisible" />
          <IconEyeClosed v-else />
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.div-custom-input {
  @apply  rounded-md shadow-sm;
}
.input-container {
  @apply relative;
  width: 100%;
}
.custom-input {
  @apply flex p-4 gap-4 items-start rounded border w-full sm:text-sm sm:leading-5 text-gray-900;
  transition: border-color 0.3s;
  width: 100%;
}
.custom-label {
  @apply block mt-4 text-sm font-medium leading-6 text-gray-900;
}
.custom-input:focus-visible {
  @apply outline-none;
}
.border-red-500 {
  border-color: #e03137;
}
.border-green-500 {
  border-color: #0caf60;
}
.icon-input {
  @apply absolute top-4 right-0 mr-2 px-2 py-1 text-sm font-medium text-gray-700 cursor-pointer;
}
</style>
