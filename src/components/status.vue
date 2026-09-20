<script setup>
    import{ref, watch} from "vue"
    import { ChevronDown, ChevronUp } from '@lucide/vue';
    import{useStore} from "@store/candidates.js"
    const store = useStore()
    const props = defineProps({
        status: String,
        id: Number,
        getStatusColor: Function,
    })
    const isOpen = ref(false)
    function toggleDropdown() {
        isOpen.value = !isOpen.value
    }
    const choosed = ref(props.status)
    watch(() => props.status, (newStatus) => {
        choosed.value = newStatus
    })
    async function selectOption(statut) {
        choosed.value = statut.nom
        isOpen.value = false
        await store.updateStatus(props.id, choosed.value)
    }
</script>

<template>
    <button @click="toggleDropdown"
        class="text-center font-medium py-1 px-2 md:px-3 rounded-full w-fit flex justify-between md:gap-4 gap-2"
        :style="{ color: getStatusColor(choosed), backgroundColor: `${getStatusColor(choosed)}33` }"> 
        {{choosed}} 
        <ChevronUp class="w-3 h-3 md:w-5 md:h-5" v-if="isOpen"/>
        <ChevronDown class="w-3 h-3 md:w-5 md:h-5" v-else/>
    </button>
        <!-- la liste déroulante -->
        <div class="bg-white rounded-xl p-4 absolute mt-2 text-xs md:text-[15px] w-fit z-30  flex flex-col gap-2 text-secondary border-primary-blue border shadow-[0_4px_20px_rgba(0,0,0,0.08)]" v-if="isOpen">
            <button class="p-2 rounded-lg flex gap-1 items-center hover:cursor-pointer" :class="choosed === s.nom && 'bg-purple/10'" v-for="(s, index) in store.status" :key="index" @click="selectOption(s)">
                {{s.nom}} 
            </button>
        </div>
</template>