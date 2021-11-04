<template>
  <div class="contact">
    <form>
      <h2>Contactez-Moi Marcel Nikolic</h2>
      <fieldset aria-labelledb="coordonnees">
        <!-- <legend>Vos coordonnées</legend> -->
        <label for="first_name">Prénom</label>
        <input type="text" name="first_name" id="first_name" aria-label="first_name" v-model="firstname">
        <label for="last_name">Nom</label>
        <input type="text" name="last_name" id="last_name" aria-label="last_name" v-model="lastname">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" aria-label="email" required="true" aria-required="true" v-model="email">
      </fieldset>
      <fieldset aria-labelledb="message">
        <label for="message">Votre message</label>
        <textarea name="message" id="message" aria-label="message" required="true" aria-required="true" v-model="message" rows="5"></textarea>
      </fieldset>
      <input type="submit" @click.prevent="sendMessage()">
      <button @click="closeForm()">
        <i class="fas fa-times" aria-dismiss="modal" aria-hidden="true"></i>
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
  background-color: red;
  display: flex;
  justify-content: center;
  form {
    max-width: 600px;
    background-color: $beige-color;
    border-radius: 5px;
    padding: 2em;
    fieldset {
      display: flex;
      flex-direction: column;
    }
    label {
      font-size: 36px;
      line-height: 1;
      margin-top: 1em;
      margin-bottom: 0.2em;
    }
    h2 {
      font-size: 64px;
      line-height: 1;
    }
    input {
      background-color: white;
      border-radius: 5px;
      height: 68px;
      &[type="submit"] {
        margin-top: 1em;
        padding: 1em 2em;
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
  }
}
</style>
