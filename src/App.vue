<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vuex from 'vuex';

export default {
  mounted() {
    this.importdatas();
  },
  methods: {
    ...Vuex.mapActions([
      'importdatas',
    ]),
  },
};
</script>

<style lang="scss">
$orange-color: #D3573C;
$red-color: #901C1C;
$beige-color: #DB8876;
$gray-color: #757575;
$lightGray-color: #C4C4C4;

* {
  /*Reset's every elements apperance*/
  background: none repeat scroll 0 0 transparent;
  border: medium none;
  border-spacing: 0;
  color: #26589F;
  font-family: 'PT Sans Narrow',sans-serif;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.42rem;
  list-style: none outside none;
  margin: 0;
  padding: 0;
  text-align: left;
  text-decoration: none;
  text-indent: 0;
}

img {
  width: 200px;
}
body{margin: 0;padding: 0;}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
