<template>
  <q-dialog v-model="showDetalsModal">
      <q-card class="modal-background modal-background-bottom">
        <q-card-section class="position-relative modal-header">
          <div class="details-top">
            <q-icon name="close" v-close-popup class="close-button close-button-modal" />
            <div>
              <div class="d-flex align-items-center justify-content-center">
                <div class="details-top-title"> {{ pokemon.name }} </div>
                <div class="details-top-subtitle" v-if="!pokemon.created"> #{{ pokemon.order < 10 ? "0"+pokemon.order : pokemon.order }} </div>
              </div>
              <div class="w-100">
                <img class="details-top-img" :src="pokemon.created ? pokemon.imageUrl : pokemon.sprites?.front_default" :alt="pokemon.name" />
              </div>
            </div>
          </div>
          <div class="details-body pt-3 pb-3">
            <div v-if="loading" class="d-flex justify-content-center">
              <q-spinner
                class="my-5"
                color="primary"
                size="3em"
              />
            </div>
            <div v-else class="container">
              <q-tabs v-model="tab" class="text-primary">
                <q-tab name="about" label="About" class="details-tab" />
                <q-tab v-if="!pokemon.created" name="moves" label="Moves" class="details-tab" />
              </q-tabs>
              <div v-if="tab === 'about'" class="mt-3 about-container">
                <div class="about-box">
                  <div class="details-about-box">
                    <div class="details-about-title details-about-title-width">Height:</div>
                    <div class="details-about-info"> {{ pokemon.height }} </div>
                  </div>
                  <div class="details-about-box">
                    <div class="details-about-title details-about-title-width">Weight:</div>
                    <div class="details-about-info"> {{ pokemon.weight }} </div>
                  </div>
                  <div class="details-about-box" v-if="!pokemon.created">
                    <div class="details-about-title details-about-title-width">Experience:</div>
                    <div class="details-about-info"> {{ pokemon.base_experience }} </div>
                  </div>
                  <div class="details-about-box" v-if="pokemon.created">
                    <div class="details-about-title details-about-title-width">Nature:</div>
                    <div class="details-about-info"> {{ pokemon.nature }} </div>
                  </div>
                  <div class="details-about-box">
                    <div class="details-about-title details-about-title-width">Type:</div>
                    <div class="details-about-info-box" v-for="(type, index) in pokemon.types" :key="index">
                      {{ type.type.name }}
                    </div>
                  </div>
                </div>
                <div class="about-box" v-if="!pokemon.created">
                  <div class="card-name mt-3">Base stats</div>
                  <div class="details-graphic-container">
                    <img class="details-graphic" src="../assets/graphic.svg" alt="">
                    <div class="details-about-container">
                      <div class="d-flex align-items-end" v-for="(stat, index) in pokemon.stats" :key="index">
                        <div class="details-about-title" style="width: 110px; margin-bottom: -3px;"> {{ stat.stat.name === 'special-defense' ? 'Sp Defense' : stat.stat.name === 'special-attack' ? 'Sp Attack' : stat.stat.name }} </div>
                        <div></div>
                        <div style="width: 100%">
                          <q-linear-progress size="15px" :value="stat.base_stat/100" class="q-mt-md" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="tab === 'moves'" class="mt-3" style="width: 336px">
                <div  class="row align-items-center">
                  <div class="col-6" v-for="(move, index) in pokemon.moves" :key="index">
                    <div class="col-details" v-if="index < 26"> {{ move.move.name }} </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center mt-5 pt-3">
              <button @click="deletePokemon(pokemon)" v-close-popup class="button-primary">Delete</button>
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
  name: 'DetailsModal',
  data: () => {
    return {
      pokemon: {},
      tab: "about",
      showDetalsModal: false
    }
  },
  setup() {
    const store = pokemonStore();
    const { deletePokemon } = store;
    return {
      deletePokemon
    };
  },
})
</script>