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
    <div v-if="!modal && !contact && currentPhotographer()" class="counter" aria-label="counter likes">
      <span aria-label="total likes">{{ totalLikes() }}<i class="fas fa-heart" aria-hidden="true"></i></span>
      <span aria-label="price"> {{ currentPhotographer().price }}€ / jour</span>
    </div>
    <main v-if="currentPhotographer() && !modal && !contact" role="main">
      <Modal
        v-if="modal"
        :media="modal"
        :photographer="currentPhotographer()"
        @close-modal="closeModal">
      </Modal>
      <header>
        <div aria-label="photograph infos">
          <h1 aria-label="photograph name">{{ currentPhotographer().name }}</h1>
          <address aria-label="address">{{ currentPhotographer().city + ", " + currentPhotographer().country }}</address>
          <p aria-label="tagline">{{ currentPhotographer().tagline }}</p>
          <div class="filters" aria-label="tags">
            <span v-for="tag in currentPhotographer().tags" :key="tag" :aria-label="'tag' + tag">
              {{ "#" + tag }}
            </span>
          </div>
        </div>
        <div class="contact">
          <button @click="contact = true" aria-label="access to contact form">Contactez-moi</button>
        </div>
        <div aria-label="image of photograph">
          <img
            :src="require(`@/assets/Photographers ID Photos/${currentPhotographer().portrait}`)"
            :alt="currentPhotographer().alt">
        </div>
      </header>

      <div class="sort" aria-labelby="sort" aria-label="sort medias">
        <label for="sort">Trier par</label>
        <select id="sort" name="sort" v-model="sort">
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
      sort: 'popularity',
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
      if (this.currentPhotographer()) {
        console.log(this.medias(this.currentPhotographer().id));
        switch (this.sort) {
          case 'popularity':
            return this.medias(this.currentPhotographer().id).sort((a, b) => b.likes - a.likes);
          case 'title':
            return this.medias(this.currentPhotographer().id).sort((a, b) => a.title.localeCompare(b.title));
          default:
            return this.medias(this.currentPhotographer().id).sort((a, b) => new Date(b.date) - new Date(a.date));
        }
      }
      return null;
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
  i {
    padding-left: 10px;
  }
}
main {
  padding-bottom: 7em;
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
  .sort {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 2em;
    select {
      margin-left: 2em;
      background-color: $red-color;
      border-radius: 5px;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      width: 170px;
      font-size: 18px;
      font-weight: 700;
      z-index: 1;
      option {
        font-size: 18px;
        font-weight: 700;
        border-bottom: solid white 2px;
      }
    }
  }
}
@media (max-width: 1250px) {
  main {
    header {
      position: relative;
      padding: 0;
      margin: 5em 0;
      div {
        &:first-of-type {
          width: 70%;
        }
      }
      h1 {
        font-size: 36px;
      }
      address, p {
        font-size: 20px;
      }
      img {
        height: 263px;
        width: 179px;
        position: absolute;
        right: -1em;
        top: -2em;
      }
      .filters span {
        font-size: 15px;
      }
      .contact {
        margin-bottom: 0;
        margin-left: 0;
        bottom: 1em;
        position: fixed;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 200;
      }
    }
  }
  .counter{
    display: none;
  }
}
</style>
