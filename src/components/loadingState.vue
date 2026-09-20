<script setup>
    import{useStore} from "@store/candidates.js"
    const store = useStore()
</script>

<template>
    <div className="flex justify-center py-6">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-300 border-t-purple"></div>
    </div>
</template>