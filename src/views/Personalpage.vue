<template>
  <div class="personalPage">
    <Modal
        v-if="modal"
        :media="modal"
        :photographer="currentPhotographer()"
        @close-modal="closeModal"
        @change-modal="changeModal">
      </Modal>
    <Menu v-if="!modal"></Menu>
    <main v-if="currentPhotographer() && !modal">
      <Modal
        v-if="modal"
        :media="modal"
        :photographer="currentPhotographer()"
        @close-modal="closeModal">
      </Modal>
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
        <Media
          v-for="media in currentMedias()"
          :key="media.id"
          :media="media"
          :photographer="currentPhotographer()"
          @open-modal="openModal">
        </Media>
      </div>
    </main>
  </div>
</template>

<script>
import Vuex from 'vuex';

import Menu from '@/components/Menu.vue';
import Media from '@/components/Media.vue';
import Modal from '@/components/Modal.vue';

export default {
  components: {
    Menu,
    Media,
    Modal,
  },
  data() {
    return {
      modal: null,
    };
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
    openModal(media) {
      this.modal = media;
    },
    closeModal() {
      this.modal = null;
    },
    changeModal(datas) {
      for (let index = 0; index < this.medias(this.currentPhotographer().id).length; index++) {
        if (datas.media === this.medias(this.currentPhotographer().id)[index]) {
          if (datas.state === 'next') {
            if (this.medias(this.currentPhotographer().id)[index + 1]) {
              this.openModal(this.medias(this.currentPhotographer().id)[index + 1]);
            } else {
              this.openModal(this.medias(this.currentPhotographer().id)[0]);
            }
          }
          if (datas.state === 'prev') {
            if (this.medias(this.currentPhotographer().id)[index - 1]) {
              this.openModal(this.medias(this.currentPhotographer().id)[index - 1]);
            } else {
              console.log(this.medias(this.currentPhotographer().id).length);
              this.openModal(this.medias(this.currentPhotographer().id)[this.medias(this.currentPhotographer().id).length - 1]);
            }
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
