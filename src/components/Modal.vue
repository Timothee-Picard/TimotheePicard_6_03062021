<template>
  <div class="modal" @keydown.left.stop="prev()" @keydown.right.stop="next()">
    <div class="slide">
      <button @click="changeModal('prev')"><i class="fas fa-arrow-left"></i></button>
      <div>
        <img
          v-if="media.image"
          :src="require(`@/assets/${photographer.name.substring(0,
            photographer.name.indexOf(' '))}/${media.image}`)"
          :alt="media.alt">
        <video controls
          v-if="media.video"
          :src="require(`@/assets/${photographer.name.substring(0,
          photographer.name.indexOf(' '))}/${media.video}`)">
        <control></control>
        </video>
        <p>{{ media.title }}</p>
      </div>
      <button @click="changeModal('next')"><i class="fas fa-arrow-right"></i></button>
      <button @click="closeModal()" class="close"><i class="fas fa-times"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    media: null,
    photographer: null,
  },
  mounted() {
    // séléctionne la croix automatiquement
    document.getElementsByTagName('button')[document.getElementsByTagName('button').length - 1].focus();
    // ajoute un événement écoutant la touche échap
    document.addEventListener('keydown', this.escape);
  },
  methods: {
    closeModal() {
      // supprime l'événement crée et emmet l'event close modal
      document.removeEventListener('keydown', this.escape);
      this.$emit('close-modal');
    },
    changeModal(state) {
      // emmet l'event change modal
      const { media } = this;
      this.$emit('change-modal', { state, media });
    },
    escape(e) {
      // si la touche esc est utilisé emmet l'event close modal
      if (e.code === 'Escape') {
        this.closeModal();
      }
    },
    next() {
      // change le contenu de la modal avec comme param next
      this.changeModal('next');
    },
    prev() {
      // change le contenu de la modal avec comme param prev
      this.changeModal('prev');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/var.scss';
.modal {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .slide {
    border: 2px solid #95FFF9;
    padding: 2%;
    display: flex;
    position: relative;
    div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  img, video {
    width: 80%;
    height: 90%;
    max-height: 700px;
    object-fit: cover;
  }
  p {
    width: 80%;
    font-size: 24px;
  }
  .close {
    position: absolute;
    right: 2%;
  }
  i {
    font-size: 25px;
    color: $red-color;
  }
}
.modal {
  @media (max-width: 790px){
    p {
      font-size: 14px;
    }
    i {
      font-size: 15px;
    }
  }
}
</style>
