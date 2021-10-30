<template>
  <div class="modal" @keydown.left.stop="prev()" @keydown.right.stop="next()">
    <div class="slide">
      <button @click="changeModal('prev')">précédent</button>
      <img
        v-if="media.image"
        :src="require(`@/assets/${photographer.name.substring(0,
          photographer.name.indexOf(' '))}/${media.image}`)"
        :alt="media.alt">
      <button @click="changeModal('next')">suivant</button>
      <button @click="closeModal()">close</button>
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
        this.$emit('close-modal');
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
  background-color: red;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .slide {
    background-color: blue;

  }
}
</style>
