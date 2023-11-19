<!-- CustomSlide -->
<script setup lang="ts">
import CustomButton from './CustomButton.vue'
import { ref } from 'vue'

const active = ref(false)

const handleClick = () => {
  console.log('active: ', active.value)
  active.value = !active.value
}
</script>
<template>
  <!-- <div class="flex justify-center items-center"> -->
    <div class="custom-slide">
      <CustomButton customClass="" @click="handleClick">
        <div :class="active === true ? 'active' : 'normal'"></div>
      </CustomButton>
    <!-- </div> -->
    <!-- <div class="ml-8">{{ active === true ? 'Activo' : 'Inactivo' }}</div> -->
  </div>
</template>
<style scoped>
.custom-slide {
  @apply flex w-1/2 p-1 items-center justify-start bg-gray-50 shadow-inner	;
  width: 45px;
  border-radius: 8px;
  
}
.normal {
  /* @apply bg-gray-200; */
  height: 20px;
  width: 20px;
  border-radius: 100%;
  animation: move-back 0.4s linear both;
}
@keyframes move-back {
  from {
    transform: translateX(20px);
    box-shadow: 0 0 8px;
    @apply bg-emerald-600;
  }
  to {
    @apply bg-gray-200;
    transform: translateX(0px);
  }
}
@keyframes move {
  from {
    transform: translateX(0px);
    @apply bg-gray-200;
  }
  to {
    box-shadow: 0 0 8px;
    transform: translateX(20px);
    @apply bg-emerald-600;
  }
}
.active {
  height: 20px;
  width: 20px;
  border-radius: 100%;
  animation: move 0.4s alternate both;
}
</style>
