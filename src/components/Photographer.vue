<template>
  <div>
    <header role="heading" aria-label="image and name of photograph">
      <img
        :src="require(`@/assets/Photographers ID Photos/${photographer.portrait}`)"
        :alt="photographer.alt">
      <router-link :to="{ name:'Personalpage', params: { id: photographer.id }}">
        <h2 aria-label="photograph name">{{ photographer.name }}</h2>
      </router-link>
    </header>
    <address aria-label="address">{{ photographer.city + ", " + photographer.country }} </address>
    <p aria-label="tagline">{{photographer.tagline}} </p>
    <div class="price" aria-label="price">{{photographer.price + "€/jour"}}</div>
    <footer aria-label="tags og this photographer">
      <span v-for="tag in photographer.tags" :key="tag" :aria-label="'tag ' + tag">
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

<style lang="scss" scoped>
@import '@/assets/var.scss';

header {
  margin-bottom: 1em;
  img {
    height: 526px;
    width: 358px;
    clip-path: circle(25%);
    object-fit: contain;
  }
  h2 {
    margin-top: -3em;
    font-size: 36px;
    color: $orange-color;
    text-align: center;
  }
}
address {
  font-size: 13px;
  color: $red-color;
  text-align: center;
}
p {
  font-size: 10px;
  text-align: center;
}
.price {
  font-size: 9px;
  color: $gray-color;
  text-align: center;
}
footer {
  display: flex !important;
  margin-top: 10px;
  padding-left: 25px;
  justify-content: center;
  span {
    margin: 0 5px;
    font-size: 12px;
    color: $red-color;
    border: solid 1px $lightGray-color;
    border-radius: 11px;
    padding: 0 7px;
  }
}
</style>
