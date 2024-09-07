<template>
  <div :id="id" class="w-full max-w-[650px] m-auto rounded-box bg-base-100 text-base-content p-1 prose"></div>
</template>

<script lang="ts">
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import type { PropType } from 'vue';
export default {
  props: {
    id: {
      type: String,
      default: "editor"
    },
    data: {
      type: Object as PropType<EditorResult>
    }
  },
  data() {
    return {
      editor: null as null | EditorJS
    }
  },
  methods: {
    async get() {
      if (this.editor)
        return this.editor.save() as Promise<EditorResult>
      return { time: 0, blocks: [], version: '' } as EditorResult
    }
  },
  mounted() {
    this.editor = new EditorJS(
      {
        holder: this.id,
        tools: {
          header: Header,
          list: List
        },
        data: this.data
      }
    );
  }
}
</script>