<script setup>
    import{ChevronRight, Calendar} from "@lucide/vue"
    import{useStore} from "@store/candidates.js"
    import Status from "./status.vue"
    const columns = [ "CONDIDAT", "POSTE", "STATUT", "DATE"]
    const store = useStore()
    // pour formater la date en format "dd/mm/yyyy"
    function formatDate(date) {
        return new Date(date).toLocaleDateString("en-GB")
    }
    function getStatusColor(status) {
        return store.status.find(item => item.nom === status)?.couleur
    }
</script>
<template>
    <div>
        <!-- l`entete de tablaux -->
        <div class="hidden md:grid  grid-cols-[2fr_2fr_1.5fr_1.5fr_40px] justify-between items-center bg-primary-blue/60 text-secondary font-semibold py-2 px-4 rounded-lg ">
            <div v-for="(column, index) in columns" :key="index">{{column}}</div>
            <div></div>
        </div>
        <!-- les lignes de tableaux -->
        <div class=" grid grid-cols-[1fr_1.1fr_auto_1.5fr_16px] gap-3 md:grid-cols-[2fr_2fr_1.5fr_1.5fr_40px] md:justify-between items-center bg-white border border-primary-blue py-4 md:py-6 px-2 md:px-4 my-3 rounded-lg text-xs md:text-[15px]" v-for="candidate in store.candidates" :key="candidate.id">
            <div class="text-main font-semibold  "> {{candidate.nom}} </div> 
            <div class="text-secondary font-medium  "> {{candidate.poste}} </div> 
            <div class="relative">
                <Status :status="candidate.statut" :id="candidate.id" :getStatusColor="getStatusColor"/>
            </div>
            <div class=" text-secondary   flex gap-1 md:gap-2 items-center "> <Calendar class="w-3 h-3 md:w-5 md:h-5"/> {{formatDate(candidate.dateCandidature)}} </div> 
                <RouterLink :to="`/candidature/${candidate.id}`" class="text-secondary hover:cursor-pointer">
                    <ChevronRight class="w-4 h-4 md:w-5 md:h-5"/> 
                </RouterLink>
        </div>

    </div>        
</template>