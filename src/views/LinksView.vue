<template>
  <div class="h-app-page w-full p-4 flex flex-col gap-1">
    <div class="flex flex-col gap-4 w-ful h-full">
      <LinkFormQuick v-model="link.data.url" @create="create" />
      <Links :links="links" @update="(link) => update(link)" @remove="(link) => remove(link)" />
    </div>
    <div class="fixed bottom-4 right-4 lg:bottom-8 lg:right-8 btn btn-accent btn-circle" @click="showModal">
      <span class="material-symbols-outlined">add</span>
    </div>
    <Modal ref="modal" @close="clearModal">
      <LinkForm :link="link" @submit="(link) => create(link)" />
    </Modal>
  </div>
</template>

<script lang="ts">
import Accordion from '@/components/daisy/Accordion.vue';
import Modal from '@/components/daisy/Modal.vue';
import LinkForm from '@/components/links/LinkForm.vue';
import LinkFormQuick from '@/components/links/LinkFormQuick.vue';
import Links from '@/components/links/Links.vue';
import { createLink, getLinks, removeLink, updateLink } from '@/services/firebase/db';

export default {
  components: {
    Accordion, LinkForm, LinkFormQuick, Links, Modal
  },
  data() {
    return {
      link: getEmptyLink(),
      links: [] as UDocument<ULink>[]
    }
  },
  methods: {
    async clearModal() {
      const url = this.link.data.url
      this.link = getEmptyLink()
      this.link.data.url = url
    },
    async showModal() {
      const modal = this.$refs.modal as typeof Modal
      modal.open();
    },
    async create(link?: UDocument<ULink>) {
      const newLink = await createLink.pLogger(link ?? this.link)
      this.links.unshift({ ...newLink, data: { ...newLink.data } });
    },
    async update(link: UDocument<ULink>) {
      const target = await updateLink.pLogger(link)
      const index = this.links.findIndex(item => item.id == link.id);
      this.links[index] = { ...target, data: { ...target.data } }
    },
    async remove(link: UDocument<ULink>) {
      await removeLink.pLogger(link.id)
      console.log(link)
      this.links = this.links.filter(item => item.id != link.id);
      console.log(link)
    },
    async getLinks() {
      this.links = await getLinks.pLogger()
    },
  },
  async mounted() {
    this.getLinks()
  }
}

const getEmptyLink = (): UDocument<ULink> => ({
  id: "",
  uid: "",
  data: {
    url: "",
    backgroundUrl: "",
    timer: 0,
    showRedirectButton: false,
    usage: 0,
    usageLimit: 0,
    isActive: true,
    isProtected: false,
    password: "",
    content: {
      blocks: [],
      time: 0,
      version: "",
    },
  },
  timestamp: Date.now(),
  utimestamp: Date.now(),
})

</script>

<style scoped>
.input input:not(:checked).toggle-primary {
  @apply bg-primary bg-opacity-20
}

input {
  min-width: unset;
}

form>* {
  @apply flex-shrink-0;
}
</style>