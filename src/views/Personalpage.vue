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

      <div class="sort" :class="(sortOpen)?'active':''" aria-labelby="sort" aria-label="sort medias">
        <label for="sort">Trier par</label>
        <div class="sort-button">
          <button @click="(sortOpen)? sortOpen=false : sortOpen=true" id="sort">{{ sort }} <i class="fas fa-chevron-left" :class="(sortOpen)?'active':''"></i></button>
          <ul v-if="sortOpen">
            <li @click="sort='Popularité'; sortOpen=false">Popularité</li>
            <li @click="sort='Date'; sortOpen=false">Date</li>
            <li @click="sort='Titre'; sortOpen=false">Titre</li>
          </ul>
        </div>
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
      sort: 'Popularité',
      sortOpen: false,
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
        switch (this.sort) {
          case 'Popularité':
            return this.medias(this.currentPhotographer().id).sort((a, b) => b.likes - a.likes);
          case 'Titre':
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
        flex-wrap: wrap;
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
    display: flex;
    align-items: center;
    margin-bottom: 2em;
    &.active {
     button {
       border-bottom-left-radius: 0px;
       border-bottom-right-radius: 0px;
     }
    }
    &-button{
      width: 200px;
    }
    label {
      margin-right: 1em;
      font-size: 18px;
      font-weight: 700;
    }
    button,li {
      font-size: 18px;
      font-weight: 700;
      padding: 0 2em;
      cursor: pointer;
      height: 69px;
      color: white;
      display: flex;
      align-items: center;
    }
    button {
      background-color: $red-color;
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-radius: 5px;
      i{
        transform: rotate(0deg);
        transition: transform 0.5s linear;
      }
      i.active{
        transform: rotate(90deg);
        transition: transform 0.5s linear;
      }
    }
    ul {
      width: inherit;
      position: absolute;
      z-index: 99;
      li {
        background-color: $red-color;
        &:first-of-type {
          border-top: 2px white solid;
        }
        &:not(li:last-of-type){
          border-bottom: 2px white solid;
        }
        &:last-of-type {
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
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
          width: 50%;
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
      .filters{
        width: 90vw !important;
        span {
          font-size: 15px;
        }
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
    .sort{
      display: none;
    }
  }
  .counter{
    display: none;
  }
}
</style>
