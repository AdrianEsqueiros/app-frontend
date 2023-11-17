// httpClient.ts
import { ref } from 'vue'
import axios from 'axios'

const httpClient = axios.create({
  baseURL: 'https://fepruebatecnicaculqi-backend-production.up.railway.app/'
})

export default function useHttpClient() {
  const loading = ref(false)

  const get = async (url: string, headers: Object) => {
    try {
      loading.value = true
      const response = await httpClient.get(url, headers)
      return response.data
    } finally {
      loading.value = false
    }
  }
  const post = async (url: string, data: any) => {
    try {
      loading.value = true
      const response = await httpClient.post(url, data)
      return response.data
    } finally {
      loading.value = false
    }
  }

  return { loading, get, post }
}
