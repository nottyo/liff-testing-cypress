<template>
  <div class="home">
    <UserProfile v-if="isLoggedIn"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import UserProfile from '@/components/UserProfile.vue';
@Component({
  name: 'Home',
  components: {
    UserProfile
  }
})
export default class Home extends Vue {
  private isLoggedIn: boolean;

  constructor() {
    super();
    this.isLoggedIn = false;
  }

  private created() {
    console.log('Home.vue liff.isLoggedIn', liff.isLoggedIn());
    this.isLoggedIn = liff.isLoggedIn();
  }
}
</script>
