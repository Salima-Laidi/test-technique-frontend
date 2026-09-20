<script setup>
  import PagePrincipale from "./components/pagePrincipale.vue"
  import{useStore} from "@store/candidates.js"
  import{watch} from "vue"
  const store = useStore()
  watch(() => store.page, () => {
      store.getCandidates()
  },{ immediate: true })
</script>

<template>
  <RouterView />
</template>
