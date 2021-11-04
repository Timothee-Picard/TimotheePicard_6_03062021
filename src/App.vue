<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vuex from 'vuex';

export default {
  created() {
    // set title page
    document.title = 'Fishoye - Photographie';
  },
  mounted() {
    // importantion des données dans le store
    this.importdatas();

    function changeFocus(element, siblingElements, side) {
      // si un élément est ciblé
      if (element) {
        // on boucle sur la liste des éléments du tableau
        for (let index = 0; index < siblingElements.length; index++) {
          // on récupère l'élément séléctionné
          if (element === siblingElements[index]) {
            // si l'evenement est précédent
            if (side === 'preview') {
              // si l'élément est le premier du tableau on renvoie au dernier sinon on renvoie
              // l'élément précedent du tableau
              if (element === siblingElements[0]) {
                siblingElements[siblingElements.length - 1].focus();
              } else {
                siblingElements[index - 1].focus();
              }
            }
            // si l'evenement est suivant
            if (side === 'next') {
              // si l'élément est le dernier du tableau on renvoie au premier sinon on renvoie
              // l'élément suivant du tableau
              if (element === siblingElements[siblingElements.length - 1]) {
                siblingElements[0].focus();
              } else {
                siblingElements[index + 1].focus();
              }
            }
          }
        }
      } else { // si aucuns éléments n'est ciblé on focus le premier élément
        siblingElements[0].focus();
      }
    }

    // quand on appuie sur une touche
    document.addEventListener('keydown', (e) => {
      // on récupère la liste des éléments pouvant être focus
      const siblingElements = [...document.querySelectorAll('a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])')];
      // on récupère l'élément ciblé si il y en as un sinon retourne null
      const element = document.querySelectorAll('* :focus')[0];
      // si la touche appuyé est la flèche gauche
      if (e.code === 'ArrowLeft') {
        changeFocus(element, siblingElements, 'preview');
      }
      // si la touche appuyé est la flèche droite
      if (e.code === 'ArrowRight') {
        changeFocus(element, siblingElements, 'next');
      }
    });
  },
  methods: {
    // récupère les actions du store
    ...Vuex.mapActions([
      'importdatas',
    ]),
  },
};
</script>

<style lang="scss">
@import '@/assets/var.scss';

* {
  /*Reset's every elements apperance*/
  background: none repeat scroll 0 0 transparent;
  border: medium none;
  border-spacing: 0;
  font-weight: normal;
  line-height: 1.42rem;
  list-style: none outside none;
  margin: 0;
  padding: 0;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
}

#app {
  text-align: center;
  padding: 0 20px;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}
</style>
