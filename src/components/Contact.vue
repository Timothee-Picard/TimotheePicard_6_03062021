<template>
  <div class="contact">
    <form role="form">
      <h2>Contactez-Moi Marcel Nikolic</h2>
      <fieldset aria-labelledby="coordonnees" role="group">
        <legend id="coordonnees" class="hide">Vos coordonnées</legend>
        <label for="first_name">Prénom</label>
        <input type="text" name="first_name" id="first_name" aria-label="first_name" v-model="firstname">
        <label for="last_name">Nom</label>
        <input type="text" name="last_name" id="last_name" aria-label="last_name" v-model="lastname">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" aria-label="email" required="true" aria-required="true" v-model="email">
      </fieldset>
      <fieldset aria-labelledby="message">
        <label for="message">Votre message</label>
        <textarea name="message" id="message" aria-label="message" required="true" aria-required="true" v-model="message" rows="5"></textarea>
      </fieldset>
      <input type="submit" @click.prevent="sendMessage()">
      <button @click="closeForm()" class="close">
        <i class="fas fa-times" aria-dismiss="modal" aria-label="close modal"></i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  props: {
    media: null,
    photographer: null,
  },
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      message: '',
    };
  },
  mounted() {
    // séléctionne la croix automatiquement
    document.getElementsByTagName('input')[0].focus();
    // ajoute un événement écoutant la touche échap
    document.addEventListener('keydown', this.escape);
  },
  methods: {
    closeForm() {
      // supprime l'événement crée et emmet l'event close modal
      document.removeEventListener('keydown', this.escape);
      this.$emit('close-form');
    },
    escape(e) {
      // si la touche esc est utilisé emmet l'event close modal
      if (e.code === 'Escape') {
        this.closeForm();
      }
    },
    sendMessage() {
      console.log(`nom:${this.firstname} \nprénom:${this.lastname} \nas envoyé le message suivant: \n${this.message}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/var.scss';
.contact {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    max-width: 400px;
    height: min-content;
    background-color: $beige-color;
    border-radius: 5px;
    padding: 2em;
    position: relative;
    fieldset {
      display: flex;
      flex-direction: column;
    }
    label {
      font-size: 26px;
      line-height: 1;
      margin-top: 1em;
      margin-bottom: 0.2em;
      color: $darkGray-color;
    }
    h2 {
      font-size: 44px;
      line-height: 1;
    }
    input {
      background-color: white;
      border-radius: 5px;
      height: 48px;
      &[type="submit"] {
        margin-top: 1em;
        padding: 1em 2em 2em 2em;
        font-size: 18px;
        background-color: $red-color;
        color: white;
      }
    }
    textarea {
      background-color: white;
      border-radius: 5px;
      resize: vertical;
    }
    .close {
      position: absolute;
      top: 1em;
      right: 1em;
      font-size: 1.5em;
      color: white;
    }
  }
  @media (max-width: 790px) {
    form {
      max-width: inherit;
      min-width: calc(100% - 24px);
      h2 {
        font-size: 34px;
      }
      label {
        font-size: 24px;
        margin-top: 0.5em;
      }
      input {
        &[type="submit"] {
          width: 100%;
          text-align: center;
        }
      }
      textarea {
        height: 80px;
      }
    }
  }
}
.hide {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap; /* added line */
  border: 0;
}
</style>
