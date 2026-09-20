<script setup>
    import { UserRoundCheck, List, BriefcaseBusiness, Calendar, Code } from '@lucide/vue';
    import Filter from "./filtre.vue"
    import SearchBar from "./searchBar.vue"
    import Candidatures from "./candidatures.vue"
    import Pagination from "./pagination.vue"
    import LoadingState from "./loadingState.vue"
    import ErrorState from "./errorState.vue"
    import{onMounted, watch, reactive} from "vue"
    import{useStore} from "@store/candidates.js"
    const store = useStore()
    const filters = reactive([
        {label: "Statut", icon:List, select:"" },
        {label: "Compétences", icon:Code, select:"" },
        {label: "Date", icon:Calendar, options:[{nom: "Plus recent"},{nom: "Plus ancien"}], select:""},
    ])
    function selecting(filter, value){
        filter.select = value
    }
    onMounted(() => {
        store.getStatus()
        store.getSkills()
    })
    watch(
        () => filters.map(filter => filter.select),
        ([status, skill, date]) => {
            store.filterCandidates(status, skill, date)
        }
    )
</script>

<template class="mx-6 md:mx15">
    <!-- navBar -->
    <nav class="flex gap-3 items-center py-5  border-b border-primary-blue mx-6 md:mx-20">
        <span class=" w-12 h-12 pl-1 bg-purple rounded-full flex justify-center items-center"><UserRoundCheck class="text-light-blue" /></span> 
        <p class="text-main font-semibold text-2xl">Recrutement</p>
    </nav>
    <!-- header -->
    <div class="pb-6 pt-10 mx-6 md:mx-20">
        <h1 class="text-4xl text-main font-bold leading-12">Bonjour !</h1>
        <p class="text-secondary text-lg font-medium">Voici la liste de vos candidatures.</p>
    </div>

    <div class="mx-2 md:mx-20">
        <div class="flex flex-col-reverse md:flex-row md:justify-between gap-4 mb-8">
            <!-- filters -->
            <div class="flex md:gap-6 gap-2 w-full">
                <Filter v-for="(filter, index) in filters" :key="index" :label="filter.label" :icon="filter.icon" :options="filter.label === 'Statut' ? store.status : filter.label === 'Compétences' ? store.skills : filter.options" :select="filter.select" @update:select="selecting(filter, $event)"/>
            </div>
            <!-- barre de recherche -->
            <SearchBar />
        </div>
        <!-- loading state -->
        <LoadingState v-if="store.loading" />
        <!-- error state -->
        <ErrorState v-if="store.error"/>
        <div v-if="!store.error && !store.loading">
            <!-- tableaux de candidatures -->
            <Candidatures />
            <!-- pagination -->
            <Pagination/>
        </div>
    </div>
</template>
