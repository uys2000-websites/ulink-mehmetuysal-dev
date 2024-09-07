<template>
  <div class="w-full">
    <label class="input input-bordered flex items-center gap-2 join pr-0 border-0">
      <span class="join-item text-base-content">Link:</span>
      <input type="text" class="join-item grow" placeholder="https://mehmetuysal.dev" v-model="value" />
      <button class="btn btn-primary join-item" @click="() => $emit('create')">
        Create
      </button>
    </label>
  </div>
</template>

<script lang="ts">
export default {
  emits: ["update:modelValue", "create"],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(val: string) {
        this.$emit("update:modelValue", val);
      },
    },
  },
};
</script>
