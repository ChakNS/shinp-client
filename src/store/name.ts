import { defineStore } from 'pinia'

export const useNameStore = defineStore('nameStore', {
  state: () => ({ name: 'chak' }),
  getters: {
    text: (state) => state.name + '的年龄是',
    myText() {
      return this.text
    },
  },
})
