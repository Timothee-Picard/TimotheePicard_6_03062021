<template>
  <header class="menu" role="navigation">
    <router-link :to="{ name:'Home' }">
      <img alt="Vue logo" :src="require(`@/assets/logo.png`)" aria-label="link to home page">
    </router-link>
    <nav v-if="tags" role="search" aria-label="filter by tags">
      <button
        v-for="tag in tags" :key="tag"
        @click="changeFilters(tag)"
        v-bind:class="{ active: filter === tag }"
        :aria-label="'tag ' + tag">
      {{ "#" + tag }}
      </button>
    </nav>
    <h1 v-if="tags" aria-label="main title">Nos photographes</h1>
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
@import '@/assets/var.scss';
header {
  img {
    padding-right: 16px;
    height: 50px;
    width: 200px;
  }
  max-width: 1440px;
  margin: auto;
  padding-top: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  nav {
    @media (max-width: 1400px) {
      order: 2;
      width: 100%;
      margin-top: 1em;
    }
    flex-grow:1;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    button {
      margin: 0 5px;
      font-size: 12px;
      color: $red-color;
      border: solid 1px $lightGray-color;
      border-radius: 11px;
      padding: 0 7px;
      &.active{
        background-color: rgb(197, 197, 197);
      }
    }
  }
  a{
    text-decoration: none;
  }
  h1{
    font-size: 36px;
    color: $red-color;
    line-height: 1;
  }
}
</style>
