<template>
  <div class="personalPage">
    <div v-if="currentPhotographer()">
      <div>
        <span>{{ totalLikes() }}</span>
        <span> {{ currentPhotographer().price }} / jour</span>
      </div>
      <h1>{{ currentPhotographer().name }}</h1>
      <address>{{ currentPhotographer().city + ", " + currentPhotographer().country }}</address>
      <p>{{ currentPhotographer().tagline }}</p>
      <div v-for="tag in currentPhotographer().tags" :key="tag">
        {{tag}}
      </div>
      <button>Contactez-moi</button>
      <img
        :src="require(`@/assets/Photographers ID Photos/${currentPhotographer().portrait}`)"
        :alt="currentPhotographer().alt">

      <div v-for="media in currentMedias()" :key="media.id">
          <div v-if="media.image">
            <img
              :src="require(`@/assets/${currentPhotographer().name.substring(0,
                currentPhotographer().name.indexOf(' '))}/${media.image}`)"
              :alt="media.alt">
          </div>
        <h3>{{ media.title }}<span>{{media.likes}}</span></h3>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex';

export default {
  computed: {
    ...Vuex.mapGetters([
      'photographer',
      'medias',
    ]),
  },
  methods: {
    ...Vuex.mapActions([
      'importdatas',
    ]),
    currentPhotographer() {
      return this.photographer(parseInt(this.$route.params.id, 10));
    },
    currentMedias() {
      return this.medias(this.currentPhotographer().id);
    },
    totalLikes() {
      let likes = 0;
      this.currentMedias().forEach((media) => {
        likes += media.likes;
      });
      return likes;
    },
  },
};
</script>
