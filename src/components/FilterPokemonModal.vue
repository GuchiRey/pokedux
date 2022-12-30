<template>
  <q-dialog v-model="showFilterModal">
    <q-icon name="close" v-close-popup @click="closeModal" class="close-button close-button-modal" />
    <q-card class="modal-background modal-background-bottom p-4" >
      <q-card-section class="position-relative modal-header">
        <div>
          <div class="card-name" style="margin-bottom: 20px">Filtrer pokemon list</div>
          <q-input class="select-input mb-4" v-model="moveSelected" label="Movement number" />
          <q-input class="select-input mb-4" v-model="levelSelected" label="Experience level" />
          <q-select class="select-input" v-model="typesSelected" multiple :options="types" use-chips stack-label label="Pokemon type" />
        </div>
        <div class="container-buttons-filter">
          <button @click="filter" class="button-primary">Filter</button>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { pokemonStore } from '../store/pokemon';

export default defineComponent({
  name: 'FilterModal',
  data: () => {
    return {
      types: [],
      moveSelected: null,
      levelSelected: null,
      typesSelected: null,
      showFilterModal: false,
    }
  },
  setup() {
    const store = pokemonStore();
    const { filterPokemons } = store;
    return {
      filterPokemons
    };
  },
  methods: {
    filter(){
      this.filterPokemons({ page: 1, filter: true, moves: this.moveSelected, level: this.levelSelected, types: this.typesSelected })
      this.moveSelected = null
      this.levelSelected = null
      this.typesSelected = null
      this.showFilterModal = false
    },
    closeModal(){
      this.moveSelected = null
      this.levelSelected = null
      this.typesSelected = null
    }
  },
})
</script>