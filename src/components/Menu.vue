<template>
  <header class="menu">
    <router-link :to="{ name:'Home' }">
      <img alt="Vue logo" :src="require(`@/assets/logo.png`)">
    </router-link>
    <nav v-if="tags">
      <button
        v-for="tag in tags" :key="tag"
        @click="changeFilters(tag)"
        v-bind:class="{ active: filter === tag }">
      {{tag}}
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    tags: null,
    filter: null,
  },
  methods: {
    changeFilters(tag) {
      this.$emit('change-filter', { tag });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
