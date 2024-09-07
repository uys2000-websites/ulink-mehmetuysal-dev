<template>
  <div class="-mt-[80px]">
    <div class="hero h-screen w-screen" style="background-image: url(/images/links.jpeg);">
      <div class="hero-overlay bg-neutral bg-opacity-40"></div>
      <div class="hero-content text-neutral-content text-center">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Welcome</h1>
          <p class="mb-5">
            Create your own updateable short link.
          </p>
          <div class="flex flex-col gap-2">
            <LinkFormQuick v-model="link.data.url" @create="create" />
            <template v-if="link.id">
              <div
                class="flex gap-1 p-3 bg-neutral text-neutral-content content-center items-center justify-between rounded-btn">
                <span>{{ url }}</span>
                <a class="flex items-center" :href="url" target="_blank">
                  <span class="material-symbols-outlined"> link </span>
                </a>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LinkFormQuick from '@/components/links/LinkFormQuick.vue';
import { createLink } from '@/services/firebase/db';
export default {
  components: { LinkFormQuick },
  data() {
    return {
      link: getEmptyLink(),
    }
  },
  methods: {
    async create() {
      this.link = await createLink.pLogger(this.link)
    },
  },
  computed: {
    url() {
      const isDev = import.meta.env.DEV
      return `https://suys.jw.lt/${this.link.id}${isDev ? "debug" : ""}`
    }
  }
}

const getEmptyLink = (): UDocument<ULink> => ({
  id: "",
  uid: "",
  data: {
    url: "",
    backgroundUrl: "",
    timer: 0,
    showRedirectButton: false,
    usage: 0,
    usageLimit: 0,
    isActive: true,
    isProtected: false,
    password: "",
    content: {
      blocks: [],
      time: 0,
      version: "",
    },
  },
  timestamp: Date.now(),
  utimestamp: Date.now(),
})
</script>
