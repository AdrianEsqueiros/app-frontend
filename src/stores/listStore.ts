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
  total:number
  optionsFilter: string[]
}

const initialListState: ListState = {
  dataList: [],
  filteredDataList: [], // Inicialmente, la lista filtrada es la misma que la lista completa
  total:0,
  totalPages: 0,
  isDataLoaded: false,
  currentPage: 1,
  itemsPerPage: 5,
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
        this.total= listData.total
        this.totalPages = Math.ceil(listData.total / limit)
        this.itemsPerPage = limit
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
    // filter by nombre or correo
    filterBySearch(search: string): void {
      this.filteredDataList = this.dataList.filter((item) => {
        const nombre = item.nombre.toLowerCase()
        const correo = item.correo.toLowerCase()
        const searchValue = search.toLowerCase()
        return nombre.includes(searchValue) || correo.includes(searchValue)
      })
    },
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
    getTotalPages(count: number): number {
      return Math.ceil(count / this.itemsPerPage)
    },
    changePage(increment: number): number {
      const newPage = this.currentPage + increment
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.currentPage = newPage
        if (this.filteredDataList !== this.dataList) {
          this.fetchData(this.itemsPerPage, newPage)
        }
      }
      return this.currentPage
    },


    
  }
})
