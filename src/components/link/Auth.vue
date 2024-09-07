<template>
  <div class="h-screen w-screen bg-neutral text-neutral-content flex flex-col justify-center items-center">
    <div class="prose bg-base-100 text-base-content p-4 rounded-box">
      <h2>This link is protected.</h2>
      <p>If You are owner you can sign your google account to access link.</p>
      <p>If you are not owner you can use password to access link.</p>
      <div>
        <form class="flex flex-col gap-2" @submit.prevent="usePassword">
          <label class="input input-bordered flex items-center gap-2">
            <span class="material-symbols-outlined">key</span>
            <input type="password" class="grow" placeholder="Password" v-model="password" />
          </label>
          <div class="flex flex-nowrap w-full gap-2">
            <button type="button" class="btn btn-neutral w-full flex-shrink" @click="signIn">
              Sign In
            </button>
            <button type="submit" class="btn btn-neutral w-full flex-shrink">
              Use Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { signIn } from "@/services/firebase/auth";
export default {
  emits: ["signIn"],
  data() {
    return {
      password: "",
    };
  },
  methods: {
    async signIn() {
      await signIn();
      this.$emit("signIn");
    },
    async usePassword() {
      const mail = "@ulink.mehmetuysal.dev";
      const id = this.$route.params.id;
      await signIn(`${id}${mail}`, this.password);
      this.$emit("signIn");
    },
  },
};
</script>
