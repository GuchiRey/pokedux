<template>
  <q-page class="background" v-cloak>
    <DetailPokemonModal ref="detailPokemonModal" />
    <FilterPokemonModal ref="filterPokemonModal" />
    <CreatePokemonModal ref="createPokemonModal" />
    <div class="top-section-container">
      <div class="container top-section">
        <div class="top-section-title">Pokedux</div>
        <div class="search-bar-blue-container">
          <div class="d-flex align-items-center keepSelectedToDelete-box">
            <div class="keepSelectedToDelete-text">Keep selected to delete</div>
            <q-checkbox v-model="keepSelectedToDelete" @click="keepSelectedToDeleteStatus" class="keepSelectedToDelete-checkbox" />
            <q-btn :disabled="!keepSelectedToDelete" label="Delete" @click="deletePokemons" class="keepSelectedToDelete-button" />
          </div>
          <div>
            <q-btn label="Create new pokemon" @click="createNewPokemon" class="create-button" />
          </div>
          <div class="search-bar-blue-body">
            <input v-model="pokemonQuery" @keyup="searchPokemons" type="text" class="search-bar-blue" style="max-width: 400px" placeholder="Search pokemon">
            <img class="search-bar-find" src="../assets/search.svg" alt="">
          </div>
          <a @click="redirectFilters" class="search-bar-filter-container"><img class="search-bar-filter" src="../assets/filters.svg" alt=""></a>
        </div>
      </div>
    </div>
    <q-pagination
      v-if="!loading"
      class="pagination"
      color="purple"
      v-model="currentPage"
      :max="pokemonLenght / 16"
      :max-pages="16"
      direction-links
    />
    <div class="container search-result-box search-result-box-results" v-if="searchStatus.active">
      <div> {{ searchStatus.count }} {{ searchStatus.count > 1 ? "Resultados" : "Resultado" }}</div>
      <a @click="clear" class="clear-filters"> Clear filters </a>
    </div>
    <div class="container search-result-box" v-if="!pokemonsRender.length && pokemons.length">
      No results found
    </div>
    <div v-if="loading" class="d-flex justify-content-center">
      <q-spinner
        class="my-5"
        color="primary"
        size="3em"
      />
    </div>
    <div v-else class="container cards">
      <a @click="pokemonSelected(pokemon)" :class="pokemon.selected ? 'card card-selected' : 'card'" v-for="(pokemon, index) in pokemonsRender" :key="index">
        <div v-if="index < 16">
          <div class="card-header">
            <div class="background-image"></div>
            <img class="card-image" :src="pokemon.imageUrl" />
          </div>
          <div class="card-body">
            <div class="card-name">{{ pokemon.name }}</div>
            <div class="card-types">
              <div v-for="(types, index) in pokemon.types" :key="index" class="card-type">
                {{ types.type.name }}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { pokemonStore } from '../store/pokemon';
import { typesStore } from '../store/types';
import { abilitiesStore } from '../store/abilities';
import { naturesStore } from '../store/natures';
import { storeToRefs } from 'pinia';
import DetailPokemonModal from '../components/DetailPokemonModal.vue'
import FilterPokemonModal from '../components/FilterPokemonModal.vue'
import CreatePokemonModal from '../components/CreatePokemonModal.vue'

export default defineComponent({
  name: 'IndexPage',
  data: () => {
    return {
      currentPage: 1,
      pokemonQuery: "",
      opened: true,
      keepSelectedToDelete: false
    }
  },
  components: {
    DetailPokemonModal,
    FilterPokemonModal,
    CreatePokemonModal
  },
  watch: {
    currentPage(newPage, oldPage) {
      this.filterPokemons({page: newPage, navigator: true, name: this.pokemonQuery.toLowerCase(), moves: this.$route.query.moves, level: this.$route.query.level, types: this.$route.query.types})
    }
  },
  methods: {
    searchPokemons(){
      this.filterPokemons({ page: 1, name: this.pokemonQuery.toLowerCase(), search: true, page: this.currentPage })
    },
    redirectFilters(){
      this.$refs.filterPokemonModal.types = this.types;
      this.$refs.filterPokemonModal.showFilterModal = true;
    },
    pokemonSelected(pokemon){
      if(!this.keepSelectedToDelete) {
        this.$refs.detailPokemonModal.pokemon = pokemon;
        this.$refs.detailPokemonModal.showDetalsModal = true;
      } else {
        pokemon.selected = !pokemon.selected
        this.pokemons.forEach((p) => {
          if(p.name === pokemon.name) {
            if(p.selected) {
              p.selected = true
            } else {
              p.selected = false
            }
          }
        })
      }
    },
    keepSelectedToDeleteStatus(){
      if(!this.keepSelectedToDelete){
        this.pokemons.forEach((pokemon) => {
          pokemon.selected = false
        })
        this.pokemonsRender.forEach((pokemon) => {
          pokemon.selected = false
        })
      }
    },
    createNewPokemon(){
      this.$refs.createPokemonModal.types = this.types;
      this.$refs.createPokemonModal.abilities = this.abilities;
      this.$refs.createPokemonModal.natures = this.natures;
      this.$refs.createPokemonModal.showCreateModal = true;
    },
    clear(){
      this.pokemonQuery = ""
      this.clearFilters()
    }
  },
  setup() {
    const store = pokemonStore();
    const storeType = typesStore();
    const storeAbilities = abilitiesStore();
    const storeNatures = naturesStore();
    const { pokemons, pokemonsRender, pokemonsFiltered, pokemonLenght, searchStatus, loading } = storeToRefs(store);
    const { getPokemons, filterPokemons, clearFilters, deletePokemons } = store;
    const { types } = storeToRefs(storeType);
    const { getTypes } = storeType;
    const { abilities } = storeToRefs(storeAbilities);
    const { getAbilities } = storeAbilities;
    const { natures } = storeToRefs(storeNatures);
    const { getNatures } = storeNatures;
    return {
      pokemons,
      pokemonLenght,
      pokemonsRender,
      pokemonsFiltered,
      searchStatus,
      loading,
      types,
      abilities,
      natures,
      getPokemons,
      filterPokemons,
      deletePokemons,
      clearFilters,
      getTypes,
      getAbilities,
      getNatures
    };
  },
  created(){
    this.getTypes()
    this.getAbilities()
    this.getNatures()
    if (this.$route.query.filter && this.pokemonsRender.length) {
      this.filterPokemons({ page: 1, filter: true, moves: this.$route.query.moves, level: this.$route.query.level, types: this.$route.query.types })
    } else {
      this.getPokemons({ page: 1})
    }
  }
})
</script>
