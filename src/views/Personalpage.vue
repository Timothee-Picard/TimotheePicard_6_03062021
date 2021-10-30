<template>
  <div class="personalPage">
    <Modal
        v-if="modal"
        :media="modal"
        :photographer="currentPhotographer()"
        @close-modal="closeModal"
        @change-modal="changeModal">
    </Modal>
    <Contact
      v-if="contact"
      @close-form="closeForm">
    </Contact>
    <Menu v-if="!modal && !contact"></Menu>
    <div class="counter" v-if="currentPhotographer()">
      <!--  eslint-disable-next-line vue/no-parsing-error -->
      <span>{{ totalLikes() }}<3</span>
      <span> {{ currentPhotographer().price }} / jour</span>
    </div>
    <main v-if="currentPhotographer() && !modal && !contact">
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
        <div class="contact">
          <button @click="contact = true">Contactez-moi</button>
        </div>
        <div>
          <img
            :src="require(`@/assets/Photographers ID Photos/${currentPhotographer().portrait}`)"
            :alt="currentPhotographer().alt">
        </div>
      </header>

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
import Contact from '@/components/Contact.vue';

export default {
  components: {
    Menu,
    Media,
    Modal,
    Contact,
  },
  data() {
    return {
      modal: null,
      contact: false,
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
      'settitle',
    ]),
    currentPhotographer() {
      return (this.photographer) ? this.photographer(parseInt(this.$route.params.id, 10)) : null;
    },
    currentMedias() {
      return (this.currentPhotographer()) ? this.medias(this.currentPhotographer().id) : null;
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
      if (this.currentPhotographer()) {
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
      }
    },
    closeForm() {
      this.contact = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/var.scss';

.counter {
  position: fixed;
  right: 5%;
  bottom: -5px;
  background-color: $beige-color;
  border-radius: 5px;
  width: 280px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    font-weight: 500;
    font-size: 19px;
    color: black;
  }
}
main {
  max-width: 1440px;
  margin: auto;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:  0 34px;
    img {
      height: 526px;
      width: 358px;
      clip-path: circle(25%);
      object-fit: contain;
    }
    h1 {
        font-size: 64px;
        color: $orange-color;
        margin-bottom: 1em;
        line-height: 1;
      }
      address {
        font-size: 24px;
        margin-bottom: 19px;
      }
      p,span {
        font-size: 18px;
        margin: 5px 0;
      }
      span,address {
        color: $red-color;
      }
      .filters {
        display: flex;
        span {
          margin: 0 10px;
          border: solid 1px$lightGray-color;
          border-radius: 11px;
          padding: 0 7px;
          &:first-of-type{
          margin-left: 0;
        }
        }
      }
    button {
      height: 69px;
      width: 170px;
      color: white;
      border: none;
      font-size: 20px;
      font-weight: 700;
      background-color: $red-color;
      text-align: center;
      cursor: pointer;
      border-radius: 5px;
    }
    .contact {
      flex-grow: 1;
      margin-bottom: 10em;
      margin-left: 3em;
    }
  }
  .feed {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
