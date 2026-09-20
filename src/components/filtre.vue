<script setup>
    import{ref, watch} from "vue"
    import { ChevronDown, ChevronUp } from '@lucide/vue';
    const props = defineProps({
        label: String,
        icon: Object,
        options: Array,
        select: String,
    })
    const emit = defineEmits(["update:select"])
    const isOpen = ref(false)
    function toggleDropdown() {
        isOpen.value = !isOpen.value

    }
    const choosed = ref("")
    function selectOption(option) {
        choosed.value = option.nom
        emit("update:select", option.nom)
        isOpen.value = false
    }
</script>

<template>
    <!-- le bouton du filtre -->
    <div class="relative w-[33%] md:w-[20%]">
        <button @click="toggleDropdown" class="w-full text-xs py-1 px-2 md:text-[15px] bg-primary-blue/60 text-main font-semibold md:py-2 md:px-4 rounded-full flex justify-between md:gap-4 items-center hover:cursor-pointer">
            <component :is="props.icon" class="hidden md:block w-5 h-5"/> 
            {{props.label}} 
            <ChevronUp class="w-3 h-3 md:w-5 md:h-5" v-if="isOpen"/>
            <ChevronDown class="w-3 h-3 md:w-5 md:h-5" v-else/>
        </button>
        <!-- la liste déroulante -->
        <div class="bg-white rounded-xl p-4 absolute mt-2 z-40 text-xs md:text-[15px] w-full  flex flex-col gap-2 text-secondary border-primary-blue border shadow-[0_4px_20px_rgba(0,0,0,0.08)]" v-if="isOpen">
            <button class="p-2 rounded-lg flex gap-1 items-center hover:cursor-pointer" :class="props.select === option.nom && 'bg-purple/10'" v-for="(option, index) in props.options" :key="index" @click="selectOption(option)">
                {{option.nom}} 
            </button>
        </div>
    </div>
</template>