<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'

import CustomInput from './customComponents/CustomInput.vue'
import CustomButton from './customComponents/CustomButton.vue'
import IconAlert from './icons/IconAlert.vue'
const { loginUser, checkAuthentication } = useAuthStore()
const email = ref('')
const password = ref('')
const invalidEmail = ref(false)
const invalidPassword = ref(false)
const errorText = ref('')
const $router = useRouter()

const handleLogin = async () => {
  try {
    await loginUser(email.value, password.value)
    invalidEmail.value = false
    invalidPassword.value = false
    $router.push({ name: 'dashboard' })
  } catch (error: any) {
    invalidEmail.value = true
    invalidPassword.value = true
    errorText.value = error.message
  }
}
onMounted(() => {
  checkAuthentication()
})
</script>

<template>
  <div class="container-login">
    <div class="login-box">
      <div class="flex flex-col justify-center gap-y-8 grow">
        <h1 class="custom-header-1">Inicia sesión</h1>
        <form @keyup.enter="handleLogin">
          <!-- Agrega el evento aquí -->

          <!-- Email Field -->
          <CustomInput
            label="Correo electrónico"
            v-model="email"
            type="email"
            name="email"
            id="email"
            placeholder="Ingresa el correo electrónico"
            :error="invalidEmail"
          />

          <!-- Password Field -->
          <CustomInput
            label="Contraseña"
            v-model="password"
            type="password"
            name="password"
            id="password"
            placeholder="Ingresa la contraseña"
            :error="invalidPassword"
          />

        </form>
          <CustomButton
            label="Iniciar sesión"
            @click="handleLogin"
            customClass="bg-gray-900 text-white  h-14 px-6  gap-2 "
          />
        <div class="text-xs flex items-center" v-if="invalidEmail || invalidPassword">
          <IconAlert />
          <p class="ml-1" style="color: #e03137">{{ errorText }}</p>
        </div>

        <div class="p-custom">
          ¿Eres nuevo aquí?
          <p style="color: #27a376">Crea una cuenta</p>
        </div>
      </div>

      <div class="footer">
        <p class="text-center">© 2023 Culqi . Todos los derechos reservados</p>
      </div>
    </div>

    <!-- <div class="mt-4">
      <p>Email: {{ email }}</p>
      <p>Contraseña: {{ password }}</p>
    </div> -->
  </div>
</template>

<style scoped>
.container-login {
  @apply flex flex-col justify-center items-center min-h-screen; /* Asegura que el contenedor ocupe al menos el 100% de la altura de la pantalla */
}
.container-login > *:first-child {
  @apply mb-8;
}
.login-box {
  @apply flex flex-col w-3/5 gap-y-8 flex-1;
}
.custom-header-1 {
  @apply text-4xl font-bold text-center;
}
.footer {
  @apply text-gray-500 mt-auto;
}
.p-custom {
  @apply text-center text-gray-500 flex flex-row justify-center items-center gap-1 self-stretch;
}
</style>
