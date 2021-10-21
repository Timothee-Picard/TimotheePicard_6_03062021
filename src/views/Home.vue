<template>
  <div class="home">
    <Menu @change-filter="changeFilter" :tags="tags" :filter="filter"></Menu>
    <main v-if="photographers">
      <article v-for="photographer in filteredPhotographers()" :key="photographer.id">
        <Photographer :photographer="photographer"></Photographer>
      </article>
    </main>
  </div>
</template>

<script>
/* eslint-disable no-unused-expressions */

import Vuex from 'vuex';

import Menu from '@/components/Menu.vue';
import Photographer from '@/components/Photographer.vue';

export default {
  components: {
    Menu,
    Photographer,
  },
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
      (this.filter === tag.tag) ? this.filter = '' : this.filter = tag.tag;
    },
  },
};
</script>

<style lang="scss">
img{
  width: 200px;
}
</style>
