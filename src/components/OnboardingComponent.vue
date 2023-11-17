<script setup lang="ts">
import IconLogoWhite from './icons/IconLogoWhite.vue'
</script>

<template>
  <div class="container">
    <img src="../assets/background.png" alt="background-img" class="object-cover h-3/4" />
    <div class="message-div">
      <IconLogoWhite />
      <h1>Dale más power ⚡ a tus empleados hoy 💪</h1>
      <p>Te ayudamos a gestionarlos de manera más sencilla</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  @apply text-4xl font-bold tracking-wide	leading-normal;
}
h1,
p {
  @apply text-white;
}
.container {
  @apply flex flex-col h-screen bg-gray-900 ;
}
.message-div {
  @apply flex flex-col justify-center items-start  p-12  border-t-4 border-t-emerald-600;
}
</style>
