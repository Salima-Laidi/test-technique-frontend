import {defineStore} from "pinia";
import {ref} from "vue";
export const useStore = defineStore('store',()=>{
    const candidates = ref([])
    const candidate = ref([])
    const status = ref([])
    const skills = ref([])
    const loading = ref(false)
    const error = ref("")
    const totaleItems = ref(0)
    const page = ref(1)
    // const link = "http://localhost:3000"
    const link = "https://test-technique-frontend.onrender.com/"
    const limit = 5
    const totale = ref(0)
    const selectedSkill = ref("")
    const selectedStatus = ref("")
    const selectedDate = ref("") 
    function previousPage(){
        if(page.value > 1){
            page.value--
        }
    }
    function nextPage(){
        if(page.value < totale.value){
            page.value++
        }
    }
    // recuperer les candidatures depuis l'API
    async function getCandidates(){
        loading.value = true
        error.value = ""
        try{
        const response = await fetch(`${link}/candidatures?_page=${page.value}&_per_page=${limit}`)
        const data = await response.json()
        
        // resource introuvable
        if (response.status === 404) {
            throw new Error("Les candidatures demandées sont introuvables.");
        }

        // erreur serveur
        if (response.status === 500) {
            throw new Error("Une erreur est survenue sur le serveur.");
        }

        // probleme de connexion
        if (!response.ok) {
            throw new Error("Impossible de récupérer les candidatures.");
        }

        candidates.value = data.data
        totale.value = data.pages
        totaleItems.value = data.items

        }// catch the errors in the try block and set the error message to the error ref
        catch(fetchError){
            error.value = fetchError.name === "TypeError"
                ? "Impossible de récupérer les candidatures."
                : fetchError.message
        }
        finally{
            loading.value = false
        }
    }

    // recuperer les inforemations d`un candidat 

    async function getCandidate(id){
        candidate.value= null
        const response = await fetch(`${link}/candidatures/${id}`)
        const data = await response.json()
        
        

        candidate.value = data
        totale.value = data.pages
        totaleItems.value = data.items

        
    }

    // recuperer les statuts
    async function getStatus(){
        
        const response = await fetch(`${link}/statuts`)
        const data = await response.json()
        status.value = data

    }


    // recuperer les competences
    async function getSkills(){
        
        const response = await fetch(`${link}/competences`)
        const data = await response.json()
        skills.value = data

    }
    
    //  rechercher les candidatures par nom ou poste...
    async function searchCandidates(search) {
    const response = await fetch(`${link}/candidatures`)
    const data = await response.json()
    const candidatesData = Array.isArray(data) ? data : data.data

    const value = search.toLowerCase().trim()
    if (!value) {
        await getCandidates()
        return
    }

    candidates.value = candidatesData.filter(candidate =>
        candidate.nom.toLowerCase().includes(value) ||
        candidate.poste.toLowerCase().includes(value)
    )
    }
    // modifier statut dans l`api
    async function updateStatus(id, status) {
        const response = await fetch(`${link}/candidatures/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                statut: status
            })
        })

        const data = await response.json()
    }
    
    // filtrer les candidatures
    async function filterCandidates(status, skill, date) {
    loading.value = true

    try {
        const response = await fetch(`${link}/candidatures`)
        const data = await response.json()

        let result = Array.isArray(data) ? data : data.data

        // Statut
        if (status) {
            result = result.filter(candidate =>
                candidate.statut === status
            )
        }

        // Compétence
        if (skill) {
            result = result.filter(candidate =>
                candidate.competences.includes(skill)
            )
        }

        // Date
        if (date === "Plus recent") {
            result.sort((a, b) =>
                new Date(b.dateCandidature) -
                new Date(a.dateCandidature)
            )
        }

        if (date === "Plus ancien") {
            result.sort((a, b) =>
                new Date(a.dateCandidature) -
                new Date(b.dateCandidature)
            )
        }

        candidates.value = result

    } catch (error) {
        error.value = "Impossible de filtrer les candidatures."
    } finally {
        loading.value = false
    }
}

    return { candidates, getCandidates, getStatus, getSkills,updateStatus, getCandidate,filterCandidates, candidate, loading, error, page, totale, totaleItems, previousPage, nextPage, searchCandidates, status, skills, selectedDate,selectedSkill,selectedStatus}
})