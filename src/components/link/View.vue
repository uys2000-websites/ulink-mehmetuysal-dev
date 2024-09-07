<template>
  <div class="h-screen w-screen flex flex-col justify-center items-center relative">
    <template v-if="link.data.backgroundUrl">
      <div class="w-full h-full bg-center bg-cover bg-no-repeat absolute"
        :style="`background-image: url('${link.data.backgroundUrl}');`">
      </div>
    </template>
    <div class="prose max-h-96 flex flex-col relative overflow-auto p-4 rounded-box bg-neutral text-neutral-content ">
      <template v-for="block in link.data.content.blocks">
        <template v-if="block.type == 'paragraph'">
          <p>{{ block.data.text }}</p>
        </template>
        <template v-if="block.type == 'header'">
          <component :is="`h${block.data.level}`">
            {{ block.data.text }}
          </component>
        </template>
        <template v-if="block.type == 'list'">
          <component :is="block.data.style == 'unordered' ? 'ul' : 'ol'">
            <template v-for="item in block.data.items">
              <li>{{ item }}</li>
            </template>
          </component>
        </template>
      </template>
      <template v-if="link.data.content.blocks.length == 0 && link.data.timer != 0">
        <p>You will be redirected soon </p>
      </template>
      <template v-if="link.data.showRedirectButton">
        <a class="prose btn btn-outline bg-neutral sticky bottom-0" :href="link.data.url">To Link</a>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { addUsage } from '@/services/firebase/db';
import type { PropType } from 'vue';

export default {
  props: {
    link: {
      type: Object as PropType<UDocument<ULink>>,
      required: true,
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
        if (timer > 0) this.redirect(timer)
        if ((timer <= 0 && !showBtn)) this.redirect(0)
      }
    },
  },
  mounted() {
    this.redirectControl()
  }
}
</script>