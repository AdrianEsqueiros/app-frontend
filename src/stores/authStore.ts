// authStore.ts
import { defineStore } from 'pinia'
import { login } from '@/api'
import type { User } from '@/types'
// Definir la interfaz para el estado del almacenamiento
interface AuthState {
  isAuthenticated: boolean
  user: null | User
}

// Inicializar el estado del almacenamiento
const initialState: AuthState = {
  isAuthenticated: false,
  user: null
}

// Crear y exportar el almacenamiento de autenticación
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({ ...initialState }),
  actions: {
    async loginUser(correo: string, password: string): Promise<void> {
      try {
        const userAuth = await login(correo, password)
        this.isAuthenticated = true
        this.user = userAuth.data.user
        localStorage.setItem('authToken', userAuth.data.token)
        localStorage.setItem('authState', JSON.stringify(this.$state))
      } catch (error:any) {
        console.error('Error al iniciar sesión:', error.message)
        throw new Error(error.message)
      }
    },

    logoutUser(): void {
      try {
        this.isAuthenticated = false
        this.user = null
        localStorage.removeItem('authToken')
        localStorage.removeItem('authState')
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
        throw new Error('Error al cerrar sesión')
      }
    },

    checkAuthentication(): void {
      const storedState = localStorage.getItem('authState')
      if (storedState) {
        const parsedState = JSON.parse(storedState)
        this.$state = { ...this.$state, ...parsedState }
      }
      const authToken = localStorage.getItem('authToken')
      if (authToken) {
        this.isAuthenticated = true
      }
    }
  }
})
