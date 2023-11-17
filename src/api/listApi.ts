// listApi.ts
import useHttpClient from '@/utils/httpClient'
import type { ListResponse } from '@/types'

const endpoint = 'empleados'

export async function getListData(limit: number = 10, page: number = 1): Promise<ListResponse> {
  try {
    const bearerToken = localStorage.getItem('authToken')
    const headers = { Authorization: `Bearer ${bearerToken}` }

    // Add query parameters for pagination
    const params = { limit, page }

    const response = await useHttpClient().get(endpoint, { headers, params })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
