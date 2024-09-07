<template>
  <div class="collapse">
    <input type="checkbox" :checked="checked" />
    <div class="collapse-title">
      <slot name="title" />
    </div>
    <div class="collapse-content">
      <slot name="content" />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>


<style scoped>
.collapse:has(input[type="checkbox"]:checked) {
  @apply overflow-visible;
}

.collapse:has(>input[type="checkbox"]:not(:checked)) {}
</style>