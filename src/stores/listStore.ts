// listStore.ts
import { defineStore } from 'pinia'
import { getListData } from '@/api'
import type { Datum } from '@/types'

interface ListState {
  dataList: Datum[]
  filteredDataList: Datum[] // Nuevo array para almacenar la lista filtrada
  totalPages: number
  isDataLoaded?: boolean
  currentPage: number
  itemsPerPage: number
  optionsFilter: string[]
}

const initialListState: ListState = {
  dataList: [],
  filteredDataList: [], // Inicialmente, la lista filtrada es la misma que la lista completa
  totalPages: 0,
  isDataLoaded: false,
  currentPage: 1,
  itemsPerPage: 10,
  optionsFilter: []
}

export const useListStore = defineStore({
  id: 'list',
  state: () => ({ ...initialListState }),
  actions: {
    async fetchData(limit: number = 10, page: number = 1): Promise<void> {
      try {
        this.isDataLoaded = false
        const listData = await getListData(limit, page)
        this.dataList = listData.data
        this.totalPages = listData.total
        this.optionsFilter = this.dataList.map((item) => item.cargo)
        this.isDataLoaded = true
      } catch (error) {
        this.isDataLoaded = false
        console.error('Error al obtener la lista de empleados:', error)
        throw new Error('Error al obtener la lista de empleados')
      }
    },
    filterByCargo(cargo: string): void {      
      this.filteredDataList = this.dataList.filter((item) => item.cargo === cargo)
    },
    // filterBySearch(search: string): void {
    //   this.filteredDataList = this.dataList.filter((item) => {
    //     item.correo === search
    //     console.log(item.correo)
    //   })
    // },

    resetFilter(): void {
      this.filteredDataList = this.dataList
    },
    get itemsToShow(): Datum[] {
      if (this.filteredDataList) {
        const start = (this.currentPage - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.filteredDataList.slice(start, end)
      } else {
        return []
      }
    },

    changePage(increment: number): number {
      const newPage = this.currentPage + increment
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.currentPage = newPage

        // Llama a fetchData con el filtro de cargo actual si está presente
        if (this.filteredDataList !== this.dataList) {
          this.fetchData(this.itemsPerPage, newPage)
        }
      }
      return this.currentPage
    }
  }
})
