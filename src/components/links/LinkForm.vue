<template>
  <form class="flex flex-col gap-[6px] h-max p-2" @submit.prevent="submit">
    <label class="label cursor-pointer input input-bordered">
      <span class="label-text">Active</span>
      <input type="checkbox" class="toggle toggle-primary min-w-0" v-model="value.data.isActive" />
    </label>
    <label class="input input-bordered flex items-center gap-2">
      Url:
      <input type="text" class="grow min-w-0" placeholder="https://mehmetuysal.dev" v-model="value.data.url" />
    </label>
    <Collapse class="border input-bordered">
      <template #title> Redirection </template>
      <template #content>
        <div class="flex-col flex gap-2">
          <label class="label cursor-pointer input input-bordered">
            <span class="label-text">Show Button</span>
            <input type="checkbox" class="toggle toggle-primary min-w-0" v-model="value.data.showRedirectButton" />
          </label>
          <label class="input input-bordered flex items-center gap-2">
            Timer:
            <input type="number" class="grow min-w-0" placeholder="100" v-model.number="value.data.timer" />
          </label>
        </div>
      </template>
    </Collapse>
    <Collapse class="border input-bordered">
      <template #title> Accessibility </template>
      <template #content>
        <div class="flex-col flex gap-2">
          <label class="input input-bordered flex items-center gap-2">
            Usage Limit:
            <input type="number" class="grow min-w-0" placeholder="100" v-model.number="value.data.usageLimit" />
          </label>
          <label class="label cursor-pointer input input-bordered">
            <span class="label-text">Password Protection</span>
            <input type="checkbox" class="toggle toggle-primary min-w-0" v-model="value.data.isProtected" />
          </label>
          <Transition>
            <template v-if="value.data.isProtected">
              <label class="input input-bordered flex items-center gap-2 h-[48px]">
                Password:
                <input type="text" class="grow min-w-0" placeholder="123asd" v-model="value.data.password" />
              </label>
            </template>
          </Transition>
        </div>
      </template>
    </Collapse>
    <Collapse class="border input-bordered">
      <template #title> Content </template>
      <template #content>
        <div class="flex-col flex gap-2">
          <label class="input input-bordered flex items-center gap-2">
            Background:
            <input type="text" class="grow w-1/2 min-w-0" placeholder="" v-model="value.data.backgroundUrl" />
          </label>
          <div class="border input-bordered rounded-btn p-3">
            Content:
            <div class="border input-bordered rounded-btn m-1 p-2">
              <Editor ref="editor" :id="`f${value.id}`" :data="value.data.content" />
            </div>
          </div>
        </div>
      </template>
    </Collapse>
    <button type="submit" class="btn btn-primary">{{ text }}</button>
  </form>
</template>

<script lang="ts">
import Editor from "../shared/Editor.vue";
import Collapse from "../daisy/Collapse.vue";
import type { PropType } from "vue";

export default {
  components: { Editor, Collapse },
  emits: ["submit", "updade:modelValue"],
  props: {
    link: {
      type: Object as PropType<UDocument<ULink>>,
      required: true,
    },
    text: {
      type: String,
      default: "Create",
    }
  },
  data() {
    return {
      value: {} as UDocument<ULink>
    }
  },
  methods: {
    async submit() {
      const editor = this.$refs.editor as typeof Editor
      this.value.data.content = await editor.get()
      this.$emit('submit', this.value)
    }
  },
  beforeMount() {
    this.value = { ...this.link, data: { ...this.link.data } }
  },
  watch: {
    link() {
      this.value = { ...this.link, data: this.link.data }
    }
  }
};

</script>

<style>
.input input:not(:checked).toggle-primary {
  @apply bg-primary bg-opacity-20;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  height: 0px;
  padding: 0px;
  font-size: 0;
}
</style>
