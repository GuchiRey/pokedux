import { defineStore } from 'pinia';
import axios from 'axios'

export const naturesStore = defineStore('natures', {
  state: () => ({
    natures: []
  }),
  actions: {
    getNatures() {
      axios.get(`https://pokeapi.co/api/v2/nature`)
      .then(res => {
        this.natures = res.data.results.map(nature => nature.name)
      })
    },
  },
});