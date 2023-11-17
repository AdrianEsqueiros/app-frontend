// authApi.ts
import useHttpClient from '@/utils/httpClient'
import type { UserAuth } from '@/types'

export async function login(correo: string, password: string): Promise<UserAuth> {
  try {
    const response = await useHttpClient().post('/auth/login', { correo, password })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
