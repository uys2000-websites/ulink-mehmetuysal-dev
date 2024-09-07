<template>
  <div class="bg-base-300">
    <template v-if="authRequire">
      <template v-if="false">Authentication View</template>
      auth
    </template>
    <template v-else-if="!link">
      <template v-if="false">404 View</template>
      <div class="h-screen w-screen relative flex flex-col justify-center items-center">
        <img src="/images/404.jpeg" alt="404 image" class="absolute w-full h-full">
        <RouterLink :to="{ name: 'HomeView' }" class="btn btn-primary z-10 min-w-32">
          To Home
        </RouterLink>
      </div>
    </template>
    <template v-else>
      <template v-if="false">Link View</template>
      <div
        class="h-screen w-screen relative flex flex-col justify-center items-center bg-center bg-no-repeat bg-contain"
        :style="`background-image: url('${link.data.backgroundUrl}');`">
        {{ link }}
        <template v-if="link.data.showRedirectButton">
          <a :href="link.data.url">To Link</a>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { getLink } from '@/services/firebase/db';
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink
  },
  data() {
    return {
      authRequire: false,
      link: null as null | UDocument<ULink>
    }
  },
  methods: {
    redirect(timer: number) {
      setTimeout(() => window.location.href = this.link?.data.url as string, timer);
    },
    redirectControl() {
      if (this.link) {
        const showBtn = this.link.data.showRedirectButton
        const timer = this.link.data.timer
        //if (timer > 0) this.redirect(timer)
        //if ((timer <= 0 && !showBtn)) this.redirect(0)
      }
    },
    async loadLink() {
      const id = this.$route.params.id as string | undefined
      if (id) {
        this.link = await getLink(id).catch((err) => {
          console.log(err)
          this.authRequire = true
          return null;
        })
        this.redirectControl()
      }
      return [!!this.link, this.authRequire]
    }
  },
  async mounted() {
    await this.loadLink.pLogger();
  }
}
</script>