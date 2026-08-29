import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useConfigStore = defineStore('config', () => {
  const tabbarFoldButton = ref(false)
  return {
    tabbarFoldButton,
  }
})
