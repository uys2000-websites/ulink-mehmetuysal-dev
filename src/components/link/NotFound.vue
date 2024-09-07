<template>
  <div class="h-screen w-screen relative flex flex-col justify-center items-center">
    <img src="/images/404.jpeg" alt="404 image" class="absolute w-full h-full">
    <RouterLink :to="{ name: 'HomeView' }" class="btn btn-primary z-10 min-w-32">
      To Home
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
  components: { RouterLink }
}
</script>