<script setup lang="ts">
import IconLogo from '../icons/IconLogo.vue'
import IconBriefCase from '../icons/IconBriefCase.vue'
import IconUsers from '../icons/IconUsers.vue'
import CustomButton from '../customComponents/CustomButton.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
const $router = useRouter()

const handleClick = (name: string) => {
  if (name === 'home') {
    authStore.logoutUser()
    $router.push({ name })
  } else {
    $router.push({ name })
  }
}
const isActive = (name: string) => {
  return $router.currentRoute.value.name === name
}
</script>

<template>
  <div>
    <aside class="sidebar">
      <div class="icon-logo-div">
        <CustomButton @click="handleClick('dashboard') ">
          <IconLogo />
        </CustomButton>
      </div>
      <div class="menu">
        <div class="menu-list">
          <CustomButton
            @click="handleClick('employees')"
            label="Empleados"
            :customClass="isActive('employees')?'text-emerald-600 button-class':'button-class'"
            :active="isActive('employees')"
          >
            <IconUsers />
          </CustomButton>
        </div>
        <div class="menu-list">
          <CustomButton
            @click="handleClick('recruitment')"
            label="Reclutamiento"
            :customClass="isActive('recruitment')?'text-emerald-600 button-class':'button-class'"
            :active="isActive('recruitment')"
          >
            <IconBriefCase />
          </CustomButton>
        </div>
      </div>
      <div class="footer">
        <CustomButton
          @click="handleClick('home')"
          label="Cerrar sesión"
          :customClass="isActive('home')?'text-emerald-600':'logout-button'"
          
          :active="isActive('home')"
        />
      </div>
    </aside>
  </div>
</template>
<style scoped>
.button-class {
  @apply text-xl ml-2 font-semibold gap-2 ;
}
.sidebar {
  @apply flex flex-col w-full h-screen p-4 border-r-2 border-gray-300;
}
.icon-logo-div {
  @apply flex justify-center my-3;
}
.menu {
  @apply flex flex-col;
}
.menu-list {
  @apply flex items-center py-5;
}
.footer {
  @apply flex flex-col justify-end mt-auto;
}
.logout-button {
  @apply bg-white text-gray-900 border border-gray-900 h-14 px-6;
}
h1 {
  @apply text-xl ml-2 font-semibold;
}
</style>
