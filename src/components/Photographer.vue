<template>
  <div>
    <header>
      <img
        :src="require(`@/assets/Photographers ID Photos/${photographer.portrait}`)"
        :alt="photographer.alt">
      <router-link :to="{ name:'Personalpage', params: { id: photographer.id }}">
        <h2>{{ photographer.name }}</h2>
      </router-link>
    </header>
    <address>{{ photographer.city + ", " + photographer.country }} </address>
    <p>{{photographer.tagline}} </p>
    <span class="price">{{photographer.price + "/jour"}}</span>
    <footer>
      <span v-for="tag in photographer.tags" :key="tag">
        {{"#" + tag}}
      </span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Photographer',
  props: {
    photographer: null,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
