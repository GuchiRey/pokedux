<template>
  <q-page class="container filter-body">
    <div>
      <a @click="redirectHome"><img src="../assets/close.svg" class="filter-close-icon"></a>
      <div class="card-name" style="margin-bottom: 20px">Filtrer pokemon list</div>
      <q-input class="select-input mb-4" v-model="moveSelected" label="Movement number" />
      <q-input class="select-input mb-4" v-model="levelSelected" label="Experience level" />
      <q-select class="select-input" v-model="typesSelected" multiple :options="types" use-chips stack-label label="Pokemon type" />
    </div>
    <div class="d-flex justify-content-between container-buttons-bottom mt-4">
      <button @click="redirectHome" class="button-secondary">Cancel</button>
      <button @click="filter" class="button-primary">Filter</button>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { typesStore } from '../store/types';
import { pokemonStore } from '../store/pokemon';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'FilterPage',
  data: () => {
    return {
      moveSelected: null,
      levelSelected: null,
      typesSelected: null,
      movesOptions: [],
      levelsOptions: [],
    }
  },
  methods: {
    redirectHome(){
      this.$router.push('/')
    },
    filter(){
      this.$router.push({ path: '/', query: { filter: true, moves: this.moveSelected, level: this.levelSelected, types: this.typesSelected } })
    }
  },
    setup() {
    const storePokemon = pokemonStore();
    const { pokemons } = storeToRefs(storePokemon);
    const { filterPokemons } = storePokemon;

    const storeType = typesStore();
    const { types } = storeToRefs(storeType);
    const { getTypes } = storeType;
    return {
      pokemons,
      types,
      getTypes,
      filterPokemons
    };
  },

})
</script>
