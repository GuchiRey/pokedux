import { defineStore } from 'pinia';
import axios from 'axios'

export const abilitiesStore = defineStore('abilities', {
  state: () => ({
    abilities: []
  }),
  actions: {
    getAbilities() {
      axios.get(`https://pokeapi.co/api/v2/ability`)
      .then(res => {
        this.abilities = res.data.results.map(ability => ability.name)
      })
    },
  },
});