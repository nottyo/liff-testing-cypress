<template>
  <b-container fluid class="mt-3">
    <b-row align-h="center">
      <b-img fluid v-bind="profileImage" rounded="circle" data-at="cy-profile-image" :src="profile.pictureUrl"></b-img>
    </b-row>
    <b-table striped hover responsive :items="items" :fields="fields" class="mt-3"></b-table>
    <b-button variant="success" class="mr-3" @click="openWindow()" data-at="cy-open-window">Open Window</b-button>
    <b-button variant="success" class="mr-3" @click="sendMessage()" data-at="cy-send-message">Send Message</b-button>
    <b-button variant="success" class="mr-3" @click="logout()" data-at="cy-logout">Logout</b-button>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import LINE from '@LINE/bot-sdk';
import templateMsg from '@/assets/flex.json';

interface Item {
  field: string;
  data: any;
}

@Component({
  name: 'UserProfile'
})
export default class UserProfile extends Vue {
  private profile = {} as LINE.Profile;
  private items: Item[] = [];
  private profileImage = {
    width: 150,
    class: 'm1'
  }
  private fields = [
    {
      key: 'field',
      class: 'font-weight-bold'
    },
    {
      key: 'data',
      tdClass: 'text-left',
      tdAttr: (value: string, key: string, item: any) => {
        return {
          'data-at': 'cy-' + item.field
        };
      }
    }
  ]
  private openWindow() {
    liff.openWindow({
      url: 'https://developers.line.biz'
    });
  }

  private async sendMessage() {
    const flexMessage: LINE.FlexMessage = {
      type: 'flex',
      altText: 'sample message',
      contents: templateMsg as LINE.FlexBubble
    }
    try {
      await liff.sendMessages([flexMessage]);
      this.$swal({
        icon: 'success',
        title: 'Success!',
        text: 'Send Message Done.'
      });
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    }
  }

  private logout() {
    liff.logout();
  }

  private async created() {
    try {
      this.profile = await liff.getProfile();
      for (const [key, value] of Object.entries(this.profile)) {
        this.items.push({
          field: 'profile.' + key,
          data: value
        });
      }
      // liff.isInClient
      this.items.push({
        field: 'liff.isInClient',
        data: liff.isInClient()
      })
      // liff.isLoggedIn
      this.items.push({
        field: 'liff.isLoggedIn',
        data: liff.isLoggedIn()
      })
      // liff.getOS
      this.items.push({
        field: 'liff.getOS',
        data: liff.getOS()
      })
      // liff.getLanguage
      this.items.push({
        field: 'liff.getLanguage',
        data: liff.getLanguage()
      })
      // liff.getVersion
      this.items.push({
        field: 'liff.getVersion',
        data: liff.getVersion()
      })
      // liff.getFriendship
      this.items.push({
        field: 'liff.getFriendship',
        data: JSON.stringify(await liff.getFriendship())
      })
      // liff.getAccessToken
      this.items.push({
        field: 'liff.getAccessToken',
        data: liff.getAccessToken()
      })
      // liff.getDecodedIDToken
      this.items.push({
        field: 'liff.getDecodedIDToken',
        data: JSON.stringify(await liff.getDecodedIDToken())
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: 'Error!',
        text: error.message
      });
    }
  }
}
</script>

<style>

</style>