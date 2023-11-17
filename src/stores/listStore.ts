// listStore.ts
import { defineStore } from 'pinia'
import { getListData } from '@/api'
import type { Datum } from '@/types'

interface ListState {
  dataList: Datum[];
  totalPages: number;
  isDataLoaded?: boolean;
  currentPage: number;
  itemsPerPage: number;
}

const initialListState: ListState = {
  dataList: [],
  totalPages: 0,
  isDataLoaded: false,
  currentPage: 1,
  itemsPerPage: 10, // Set the number of items to show per page
}

export const useListStore = defineStore({
  id: 'list',
  state: () => ({ ...initialListState }),
  actions: {
    async fetchData( limit: number = 10,page: number = 1): Promise<void> {
      try {
        this.isDataLoaded = false
        const listData = await getListData(limit,page)
        this.dataList = listData.data        
        this.totalPages = listData.total
        console.log(this.totalPages)
        this.isDataLoaded = true
      } catch (error) {
        this.isDataLoaded = false
        console.error('Error al obtener la lista de empleados:', error)
        throw new Error('Error al obtener la lista de empleados')
      }
    },
    
    get itemsToShow(): Datum[] {
      if (this.dataList) {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.dataList.slice(start, end);
      } else {
        return [];
      }
    },
    
    changePage(increment: number): number {
      const newPage = this.currentPage + increment;
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.currentPage = newPage;
      }
      return this.currentPage;
    },
  },
});
