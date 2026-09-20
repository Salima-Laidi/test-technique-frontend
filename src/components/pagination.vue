<script setup>
    import {ChevronLeft, ChevronRight} from "@lucide/vue"
    import{useStore} from "@store/candidates.js"
    const store = useStore()
</script>   

<template>
    <div class="flex flex-col justify-center items-center gap-2 my-6">
        <p class="text-secondary font-medium">{{ store.totaleItems }} Candidatures</p>
        <div class="flex gap-2 justify-center items-center">
            <button class="text-purple w-10 h-10 rounded-full border border-primary-blue flex items-center justify-center hover:cursor-pointer" @click="store.previousPage"> <ChevronLeft /> </button>
            <span class="text-secondary font-medium py-2 px-4 bg-primary-blue rounded-full"> {{ store.page }} / {{ store.totale || 1 }} </span>
            <button class="text-purple w-10 h-10 rounded-full border border-primary-blue flex items-center justify-center hover:cursor-pointer" @click="store.nextPage"> <ChevronRight /> </button>
        </div>
    </div>
</template>