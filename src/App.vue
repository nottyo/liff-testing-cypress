<template>
  <div id="app">
    <router-view v-if="isLoggedIn"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
declare global {
  interface Window {
    Cypress: any;
  }
}
@Component
export default class App extends Vue {
  private isLoggedIn = false;
  private liffId = process.env.VUE_APP_LIFF_ID as string;
  private async initLiff() {
    const isInCypress = window.Cypress ? true : false;
    // if app is running by Cypress, then uses the liff mock object
    console.log('isInCypress', isInCypress);
    if (isInCypress) {
      window.liff = window.Cypress.liffMock;
    }
    try {
      console.log('initLiff....')
      await liff.init({
        liffId: this.liffId
      });
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        this.isLoggedIn = true;
      }
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: 'Error!',
        text: error.message
      });
    }
  }

  private async created() {
    await this.initLiff();
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
