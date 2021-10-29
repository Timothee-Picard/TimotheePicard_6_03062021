<template>
  <div class="modal">
    <div class="slide" >
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
    document.getElementsByTagName('button')[0].focus();
    document.addEventListener('keydown', this.escape);
  },
  methods: {
    closeModal() {
      document.removeEventListener('keydown', this.escape);
      this.$emit('close-modal');
    },
    changeModal(state) {
      const { media } = this;
      this.$emit('change-modal', { state, media });
    },
    escape(e) {
      if (e.code === 'Escape') {
        this.$emit('close-modal');
      }
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
