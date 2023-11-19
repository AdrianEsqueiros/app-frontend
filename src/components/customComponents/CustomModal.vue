<script setup lang="ts">
import { ref } from 'vue'
import CustomButton from './CustomButton.vue'
import CustomInput from './CustomInput.vue'
import CustomSlide from './CustomSlide.vue'
const props = defineProps([
  'title',
  'show',
  'nombre',
  'correo',
  'cargo',
  'departamento',
  'oficina',
  'estadoCuenta'
])

const emits = defineEmits(['close:closeModal', 'submit:formSubmit'])

const handleSubmit = () => {
  // Validate and handle form submission
  const formData = {
    nombre: nombre.value,
    correo: correo.value,
    cargo: cargo.value,
    departamento: departamento.value,
    oficina: oficina.value,
    estadoCuenta: estadoCuenta.value
    // Add more fields as needed
  }

  emits('submit:formSubmit', formData)
  // Optionally, close the modal here
  emits('close:closeModal')
}

const nombre = ref(props.nombre)
const correo = ref(props.correo)
const cargo = ref(props.cargo)
const departamento = ref(props.departamento)
const oficina = ref(props.oficina)
const estadoCuenta = ref(props.estadoCuenta)
// Add more refs for other fields as needed
</script>
<template>
  <div v-if="props.show" class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Background overlay, show/hide based on modal state. -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >

      <!-- Modal panel, show/hide based on modal state. -->
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="flex justify-between">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              {{ props.title }}
            </h3>
            <div class="ml-3 h-7 flex items-center">
              <button
                @click="emits('close:closeModal')"
                type="button"
                class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <span class="sr-only">Close</span>
                <!-- <IconClose /> -->
              </button>
            </div>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-2">
                <CustomInput
                  v-model="nombre"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nombre"
                />
              </div>

              <div class="col-span-1">
                <CustomInput
                  v-model="cargo"
                  type="text"
                  name="cargo"
                  id="cargo"
                  placeholder="Nombre Cargo"
                />
              </div>
              <div class="col-span-2">
                <CustomInput
                  v-model="correo"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Correo"
                />
              </div>
              <div class="col-span-1">
                <CustomInput
                  v-model="departamento"
                  type="text"
                  name="departamento"
                  id="departamento"
                  placeholder="Departamento"
                />
              </div>
              <div class="col-span-2">
                <CustomInput
                  v-model="oficina"
                  type="text"
                  name="oficina"
                  id="oficina"
                  placeholder="Oficina"
                />
              </div>
              <div class="col-span-1">
                <CustomSlide />
              </div>
            </div>
          </div>
          <div class="mt-2 bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <CustomButton type="submit" customClass="bg-green-500 hover:bg-green-600">
              Guardar
            </CustomButton>
          </div>

          <CustomButton
            @click="emits('close:closeModal')"
            customClass="bg-red-500 hover:bg-red-600"
          >
            Cerrar
          </CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>
