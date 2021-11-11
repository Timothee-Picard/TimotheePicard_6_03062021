<template>
  <article role="article" :aria-label="'photo or video took by ' + photographer.name">
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
      <figcaption aria-label="title of photo">
        <p>{{ media.title }}<span>{{media.likes}}<i class="fas fa-heart" :class="(liked)? 'liked' :''" aria-hidden="true" @click="(liked)? liked = false : liked = true; (liked)?media.likes+=1:media.likes+=-1"></i></span></p>
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
  data() {
    return {
      liked: false,
    };
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
      z-index: -20;
    }
    p {
      color: $red-color;
      display: flex;
      justify-content: space-between;
      span {
        font-weight: 700;
        i {
          margin-left: 0.5em;
          cursor: pointer;
          color: $gray-color;
          &.liked {
            color: $red-color;
          }
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
