<template>
  <div class="home">
    <div v-if="photographers">
      <button
        v-for="tag in tags" :key="tag"
        @click="changeFilter(tag)"
        v-bind:class="{ active: filter === tag }">
      {{tag}}
      </button>
      <div v-for="photographer in filteredPhotographers()" :key="photographer.id">
        <img
          :src="require(`@/assets/Photographers ID Photos/${photographer.portrait}`)"
          :alt="photographer.alt">
        <router-link :to="{ name:'Personalpage', params: { id: photographer.id }}">
          <h2>{{ photographer.name }}</h2>
        </router-link>
        <address>{{ photographer.city + ", " + photographer.country }} </address>
        <p>{{photographer.tagline}} </p>
        <span>{{photographer.price + "/jour"}}</span>
        <div v-for="tag in photographer.tags" :key="tag">
          {{"# " + tag}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-expressions */

import Vuex from 'vuex';

export default {
  data() {
    return {
      filter: '',
    };
  },
  mounted() {

  },
  computed: {
    ...Vuex.mapGetters([
      'photographers',
      'tags',
    ]),
  },
  methods: {
    filteredPhotographers() {
      const result = [];
      this.photographers.forEach((element) => {
        element.tags.includes(this.filter) ? result.push(element) : null;
      });

      return (result.length > 0) ? result : this.photographers;
    },
    changeFilter(tag) {
      (this.filter === tag) ? this.filter = '' : this.filter = tag;
    },
  },
};
</script>

<style lang="scss">
img{
  width: 200px;
}
</style>
