<script setup>
    import{Search, X} from "@lucide/vue"
    import{ref,watch} from "vue"
    import{useStore} from "@store/candidates.js"
    const store = useStore()
    const search = ref("")
    let timer
    watch(search, (newValue) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
        store.searchCandidates(newValue)
    }, 500)
}, { immediate: true })
</script>

<template>
    <div class="w-full bg-white rounded-full flex justify-between text-secondary font-medium py-2 px-4 items-center border-primary-blue border md:w-150 hover:cursor-pointer">
        <div class="flex min-w-0 flex-1 gap-2 items-center">
            <Search  class="w-5 h-5"/>
            <input type="text" placeholder="Rechercher par nom, poste..." class="min-w-0 flex-1 outline-none" v-model="search"/> 
        </div>
        <X class="w-4 h-4 hover:cursor-pointer" v-if="search" @click="search = ''"/>
    </div>
</template>
