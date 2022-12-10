<template>
  <video
    tabindex="0"
    @keypress.enter="openModal(media)"
    @click="openModal(media)"
    v-if="media.video"
    :src="require(`@/assets/${photographer.name.substring(0,
          photographer.name.indexOf(' '))}/${media.video}`)" />
</template>

<script>
export default {
  name: 'ParentComponent',
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
