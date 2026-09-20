<script setup>
    import{useStore} from "@store/candidates.js"
    const store = useStore()
</script>

<template>
    <div class="flex flex-col justify-center items-center gap-4 my-6">
        <p class="text-red-500 medium">{{ store.error }}</p>
        <button class="text-purple rounded-full border py-2 px-3 border-primary-blue flex items-center justify-center hover:cursor-pointer" @click="store.getCandidates">Réessayer</button>
    </div>
</template>