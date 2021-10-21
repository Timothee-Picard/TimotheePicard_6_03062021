<template>
  <div class="personalPage">
    <Menu></Menu>
    <main v-if="currentPhotographer()">
      <header>
        <div>
          <h1>{{ currentPhotographer().name }}</h1>
          <address>{{ currentPhotographer().city + ", " + currentPhotographer().country }}</address>
          <p>{{ currentPhotographer().tagline }}</p>
          <div class="filters">
            <span v-for="tag in currentPhotographer().tags" :key="tag">
              {{ "#" + tag }}
            </span>
          </div>
        </div>
        <div>
          <button>Contactez-moi</button>
        </div>
        <div>
          <img
            :src="require(`@/assets/Photographers ID Photos/${currentPhotographer().portrait}`)"
            :alt="currentPhotographer().alt">
        </div>
      </header>

      <div>
        <span>{{ totalLikes() }}</span>
        <span> {{ currentPhotographer().price }} / jour</span>
      </div>

      <div class="sort">
        <label for="sort">Trier par</label>
        <select id="sort" name="sort">
          <option value="popularity">Popularité</option>
          <option value="date">Date</option>
          <option value="title">Titre</option>
        </select>
      </div>
      <div class="feed">
        <article v-for="media in currentMedias()" :key="media.id">
          <figure>
            <img
              v-if="media.image"
              :src="require(`@/assets/${currentPhotographer().name.substring(0,
                currentPhotographer().name.indexOf(' '))}/${media.image}`)"
              :alt="media.alt">
          </figure>
          <figcaption>
            <p>{{ media.title }}<span>{{media.likes}}</span></p>
          </figcaption>
        </article>
      </div>
    </main>
  </div>
</template>

<script>
import Vuex from 'vuex';

import Menu from '@/components/Menu.vue';

export default {
  components: {
    Menu,
  },
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

<style lang="scss" scoped>

</style>
