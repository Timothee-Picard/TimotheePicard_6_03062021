<template>
  <figure tabindex="0" @keypress.enter="openModal(media)" @ @click="openModal(media)">
    <img
      v-if="media.image"
      :src="require(`@/assets/${photographer.name.substring(0,
        photographer.name.indexOf(' '))}/${media.image}`)"
      :alt="media.alt">
    <figcaption>
      <p>{{ media.title }}<span>{{media.likes}}</span></p>
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: 'Media',
  props: {
    photographer: null,
    media: null,
  },
  methods: {
    openModal(media) {
      this.$emit('open-modal', media);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/var.scss';

</style>
