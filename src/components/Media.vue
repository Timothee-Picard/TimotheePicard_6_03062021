<template>
  <article>
    <figure>
      <img
        tabindex="0"
        @keypress.enter="openModal(media)"
        @click="openModal(media)"
        v-if="media.image"
        :src="require(`@/assets/${photographer.name.substring(0,
          photographer.name.indexOf(' '))}/${media.image}`)"
        :alt="media.alt">
        <video
          tabindex="0"
          @keypress.enter="openModal(media)"
          @click="openModal(media)"
          v-if="media.video"
          :src="require(`@/assets/${photographer.name.substring(0,
          photographer.name.indexOf(' '))}/${media.video}`)"></video>
      <figcaption>
        <p>{{ media.title }}<span>{{media.likes}}<i class="fas fa-heart" aria-hidden="true"></i></span></p>
      </figcaption>
    </figure>
  </article>
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
    test(aaa) {
      const re = /(?:\.([^.]+))?$/;
      const ext = re.exec(aaa)[1]; // donnera "txt"
      return ext;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/var.scss';
article {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  figure {
    height: 300px;
    width: 365px;
    img, video {
      height: 100%;
      width: 100%;
      object-fit: cover;
      cursor: pointer ;
      border-radius: 5px;
    }
    p {
      color: $red-color;
      display: flex;
      justify-content: space-between;
      span {
        font-weight: 700;
        i {
          margin-left: 0.5em;
        }
      }
    }
  }
  @media (max-width: 790px) {
    width: 100%;
    figure {
      width: 100%;
      height: 190px;
      img,video {
        width: 100%;
      }
    }
  }
}
</style>
