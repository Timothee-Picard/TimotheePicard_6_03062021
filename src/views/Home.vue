<template>
  <div class="home">
    <Menu @change-filter="changeFilter" :tags="tags" :filter="filter"></Menu>
    <main v-if="photographers" role="main" aria-label="liste of photographs">
      <article v-for="photographer in filteredPhotographers()" :key="photographer.id">
        <Photographer :photographer="photographer"></Photographer>
      </article>
    </main>
  </div>
</template>

<script>
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

<style lang="scss" scoped>
@import '@/assets/var.scss';

main {
  padding-bottom: 60px;
  max-width: 1440px;
  margin: auto;
  margin-bottom: 3em;
  display: flex;
  flex-wrap: wrap;
  justify-content:space-evenly;
  position: relative;
  h1 {
      position: absolute;
      top: -50px;
      right: 6%;
      font-size: 36px;
  }
  article {
      margin: 0 10px;
  }
}
</style>
