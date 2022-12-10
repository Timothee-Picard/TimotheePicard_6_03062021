<template>
  <img
    tabindex="0"
    @keypress.enter="openModal(media)"
    @click="openModal(media)"
    v-if="media.image"
    :src="require(`@/assets/${photographer.name.substring(0,
          photographer.name.indexOf(' '))}/${media.image}`)"
    :alt="media.alt">
</template>

<script>
export default {
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
