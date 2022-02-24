import { defineStore } from 'pinia'
import { useNameStore } from './name'

export const useAgeStore = defineStore('ageStore', {
  state: () => ({ age: 18 }),
  getters: {
    nextAge: (state) => state.age + 1,
    chakAge() {
      const nameStore = useNameStore()
      return nameStore.text + this.nextAge
    },
  },
  actions: {
    increment() {
      this.age++
    },
  },
})
