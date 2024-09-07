<template>
  <Accordion class="bg-neutral text-neutral-content flex-shrink-0">
    <template #title>
      <div class="flex justify-between flex-wrap gap-1">
        <div class=" text-error z-10 cursor-pointer" @click="() => $emit('remove', value)">
          <span class="material-symbols-outlined">delete</span>
        </div>
        <span>
          {{ value.data.url }}
        </span>
        <span class="flex items-center gap-2 z-10 ml-auto">
          {{ shortUrl }}
          <a class="flex items-center" :href="shortUrl" target="_blank">
            <span class="material-symbols-outlined mt-1"> link </span>
          </a>
        </span>
      </div>
    </template>
    <template #content>
      <div class="h-max">
        <LinkForm :link="value" text="Update" v-on:submit="(v) => $emit('update', v)" />
      </div>
    </template>
  </Accordion>
</template>

<script lang="ts">
import type { PropType } from "vue";
import Accordion from "../daisy/Accordion.vue";
import LinkForm from "./LinkForm.vue";

export default {
  components: { Accordion, LinkForm },
  emits: ["remove", "update", "update:modelValue"],
  props: {
    link: {
      type: Object as PropType<UDocument<ULink>>,
      required: true,
    },
  },
  data() {
    return {
      value: {} as UDocument<ULink>
    }
  },
  computed: {
    shortUrl() {
      const isDev = import.meta.env.DEV
      return `https://suys.jw.lt/${this.value.id}${isDev ? "debug" : ""}`
    },
  },
  beforeMount() {
    this.value = { ...this.link, data: this.link.data }
  },
  watch: {
    link() {
      this.value = { ...this.link, data: this.link.data }
    }
  }
};

</script>
