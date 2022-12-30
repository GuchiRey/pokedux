<template>
  <q-dialog v-model="showCreateModal">
      <q-card class="modal-background modal-background-bottom">
        <q-card-section class="position-relative modal-header">
          <div class="details-top">
            <q-icon name="close" v-close-popup class="close-button close-button-modal" />
            <div class="card-name mt-3"> Create new pokemon </div>
            <q-input class="select-input mb-3" v-model="pokemon.name" label="Name" />
            <q-input class="select-input mb-3" v-model.number="pokemon.height" type="number" label="Height" />
            <q-input class="select-input mb-3" v-model.number="pokemon.weight" type="number" label="Weight" />
            <q-input class="select-input mb-3" v-model="pokemon.imageUrl" label="Image URL" />
            <q-select class="select-input mb-3" v-model="pokemon.types" multiple :options="types" use-chips stack-label label="Type" />
            <q-select class="select-input mb-3" v-model="pokemon.abilities" multiple :options="abilities" use-chips stack-label label="Ability" />
            <q-select class="select-input" v-model="pokemon.nature" :options="natures" stack-label label="Nature" />
            <div class="container-buttons-filter">
              <button @click="create" class="button-primary">Save</button>
            </div>
          </div>
        </q-card-section>
      </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { pokemonStore } from '../store/pokemon';

export default defineComponent({
  name: 'CreateModal',
  data: () => {
    return {
      types: [],
      abilities: [],
      natures: [],
      pokemon: {
        name: "",
        types: [],
        abilities: [],
        nature: "",
        height: null,
        weight: null,
        imageUrl: '',
        created: true
      },
      err: null,
      showCreateModal: false
    }
  },
  setup() {
    const store = pokemonStore();
    const { createPokemon } = store;
    return {
      createPokemon
    };
  },
  methods: {
    create(){
      if(!this.pokemon.name) {
        return this.$q.notify({ type: 'negative', message: 'Name is required' })
      }
      if(!this.pokemon.height) {
        return this.$q.notify({ type: 'negative', message: 'Height is required' })
      }
      if(!this.pokemon.weight) {
        return this.$q.notify({ type: 'negative', message: 'Weight is required' })
      }
      if(!this.pokemon.types.length) {
        return this.$q.notify({ type: 'negative', message: 'Types is required' })
      }
      if(!this.pokemon.abilities.length) {
        return this.$q.notify({ type: 'negative', message: 'Abilities is required' })
      }
      if(!this.pokemon.nature) {
        return this.$q.notify({ type: 'negative', message: 'Nature is required' })
      }
      if(!this.pokemon.imageUrl) {
        return this.$q.notify({ type: 'negative', message: 'Image is required' })
      }
      this.pokemon.types = this.pokemon.types.map(t => {
        return { type: { name: t } }
      })
      this.createPokemon(this.pokemon)
      this.pokemon = {
        name: "",
        types: [],
        abilities: [],
        nature: "",
        height: null,
        weight: null,
        imageUrl: '',
      }
      this.showCreateModal = false
    }
  }
})
</script>