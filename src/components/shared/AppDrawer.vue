<template>
  <div class="drawer-side">
    <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-neutral min-h-full p-4 flex flex-col gap-1" style="transition: 200ms;"
      :class="{ 'w-[165px]': isOpen, 'w-[90px]': !isOpen, }">
      <li>
        <RouterLink :to="{ name: 'AppView' }" class="btn btn-neutral justify-start text-nowrap flex-nowrap">
          <span class="material-symbols-outlined">home</span>
          <span v-if="isOpen">App Home</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'AppView' }" class="btn btn-neutral justify-start text-nowrap flex-nowrap">
          <span class="material-symbols-rounded">link</span>
          <span v-if="isOpen">My Links</span>
        </RouterLink>
      </li>
      <li>
        <button class="btn btn-neutral justify-start text-nowrap flex-nowrap" @click="() => signOut()">
          <span class="material-symbols-rounded">logout</span>
          <span v-if="isOpen">SignOut</span>
        </button>
      </li>
      <li class="mt-auto">
        <button class="btn btn-neutral text-nowrap flex-nowrap" @click="() => isOpen = !isOpen">
          <span class="material-symbols-rounded transition-all duration-200">
            arrow_forward_ios
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { signOut } from '@/services/firebase/auth';
import { RouterLink } from 'vue-router';

export default {
  components: { RouterLink },
  data() {
    return {
      isOpen: true,
    }
  },
  methods: {
    signOut
  }
}
</script>