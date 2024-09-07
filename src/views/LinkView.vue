<template>
  <div class="bg-base-300">
    <Auth @sign-in="onSignIn" v-if="authRequire" />
    <NotFound v-else-if="!link" />
    <View v-else-if="link" :link="link" />
    <template v-else> How can this posible :) </template>
  </div>
</template>

<script lang="ts">
import Auth from "@/components/link/Auth.vue";
import NotFound from "@/components/link/NotFound.vue";
import View from "@/components/link/View.vue";
import { signOut } from "@/services/firebase/auth";
import { addUsage, getLink } from "@/services/firebase/db";
import { RouterLink } from "vue-router";

export default {
  components: {
    Auth,
    NotFound,
    View,
    RouterLink,
  },
  data() {
    return {
      authRequire: false,
      link: null as null | UDocument<ULink>,
    };
  },
  methods: {
    async onSignIn() {
      this.link = await getLink
        .pLogger(this.$route.params.id as string).then(async (link) => {
          if (link) await addUsage.pLogger(link.id)
          return link;
        })
        .catch(async (err) => {
          await signOut()
          this.authRequire = true;
          return null;
        });
      if (this.link) this.authRequire = false;
      await signOut()
    },
    async loadLink() {
      this.link = await getLink
        .pLogger(this.$route.params.id as string).then(async (link) => {
          if (link) await addUsage.pLogger(link.id)
          return link;
        })
        .catch((err) => {
          this.authRequire = true;
          return null;
        });
      return [!!this.link, this.authRequire];
    },
  },
  async mounted() {
    await this.loadLink.pLogger();
  },
};
</script>
