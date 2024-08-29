<template>
  <div class="h-screen w-screen top-0 left-0 flex justify-center fixed">
    <span class="loading loading-infinity loading-lg"></span>
  </div>
</template>
<script lang="ts">
import { auth } from '@/services/firebase/auth';
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      authStore: useAuthStore()
    }
  },
  async mounted() {
    await auth.authStateReady()
    setTimeout(() => {
      this.authStore.id = auth.currentUser?.uid ?? null
      if (this.authStore.isAuthenticated && this.$route.redirectedFrom?.name)
        this.$router.push({ name: this.$route.redirectedFrom?.name })
      else if (this.$route.redirectedFrom?.redirectedFrom?.name)
        this.$router.push({ name: this.$route.redirectedFrom?.redirectedFrom?.name })
      else this.$router.push({ name: "HomeView" })
    }, 200);
  }
}
</script>