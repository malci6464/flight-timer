import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
  const backendUrl = ref('http://localhost:3000/')


  return { backendUrl }
})
