<script setup lang="ts">
const { label, customClass, active } = defineProps(['label', 'customClass', 'active'])
</script>

<template>
  <button :class="[customClass, { active: active }]" class="custom-button">
    <slot />
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<style scoped>
.custom-button {
  @apply flex rounded-md justify-center items-center self-stretch;
}

.active {
  @apply text-emerald-600 ;
}

</style>
