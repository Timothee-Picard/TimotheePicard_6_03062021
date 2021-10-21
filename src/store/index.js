/* eslint-disable no-shadow */
import Vue from 'vue';
import Vuex from 'vuex';
import Datas from '@/assets/FishEyeData.json';

Vue.use(Vuex);

const state = {
  photographers: [],
  medias: [],
};

const mutations = {
  IMPORTDATAS: (state, infos) => {
    state.photographers = infos.photographers;
    state.medias = infos.media;
  },
};

const getters = {
  photographers: (state) => state.photographers,
  photographer: (state) => (id) => state.photographers.find(
    (photographer) => photographer.id === id,
  ),
  medias: (state) => (id) => state.medias.filter(
    (media) => media.photographerId === id,
  ),
  tags: (state) => {
    const tags = [];
    state.photographers.forEach((photographer) => {
      photographer.tags.forEach((tag) => {
        tags.push(tag);
      });
    });
    return [...new Set(tags)];
  },
};

const actions = {
  importdatas: (store) => {
    store.commit('IMPORTDATAS', Datas);
  },
};

// export default
export default global.store = new Vuex.Store({

  state,

  mutations,

  getters,

  actions,

  strict: true,

});
