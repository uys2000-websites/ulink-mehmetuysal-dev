<template>
  <div class="flex flex-col gap-2 h-full overflow-auto flex-nowrap">
    <template v-for="link, i in links" :key="i">
      <Link :link="link" @update="(link) => $emit('update', link)" @remove="(link) => $emit('remove', link)" />
    </template>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import Link from "./Link.vue";

export default {
  components: { Link },
  emits: ["remove", "update"],
  props: {
    links: {
      type: Array as PropType<Array<UDocument<ULink>>>,
      required: true,
    },
  },
};
</script>
