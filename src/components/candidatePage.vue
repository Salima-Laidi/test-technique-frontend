<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@store/candidates.js"
import Status from "./status.vue"
import { ArrowLeft, CalendarDays, Clock3, Coins, Download, Eye, FileText, Mail, MapPin, MessageCircle, Phone, Send, UserRound } from '@lucide/vue';

const route = useRoute()
const store = useStore()

function getStatusColor(status) {
    return store.status.find(item => item.nom === status)?.couleur
}


function formatDate(date) {
        return new Date(date).toLocaleDateString("en-GB")
    }



watch(
    () => route.params.id,
    async (id) => {
        await store.getStatus()
        await store.getCandidate(Number(id))
    },
    { immediate: true }
)


</script>

<template>
    <div v-if="store.candidate?.id" class="min-h-screen bg-light-blue px-4 py-6 text-main sm:px-8 lg:px-12">
        <div class="mx-auto max-w-5xl">
            <RouterLink :to="`/`" class="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-blue bg-white px-4 py-2 text-sm font-semibold text-purple">
                <ArrowLeft class="h-4 w-4" />
                Retour aux candidatures
            </RouterLink>

            <div class="rounded-lg border border-primary-blue/70 bg-white p-5 shadow-[0_8px_24px_rgba(71,101,170,0.08)] sm:p-6">
                <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div class="flex gap-4">
                        <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple/10 text-purple">
                            <UserRound class="h-6 w-6" />
                        </div>
                        <div>
                            <h1 class="text-xl font-bold leading-tight text-main sm:text-2xl">{{ store.candidate.nom }}</h1>
                            <p class="mt-1 text-sm font-medium text-secondary">{{ store.candidate.poste }}</p>
                        </div>
                    </div>
                    <div class="relative">
                        <Status :status="store.candidate.statut" :id="store.candidate.id" :getStatusColor="getStatusColor" />
                    </div>
                </div>

                <div class="mt-6 grid gap-4 border-t border-primary-blue/60 pt-5 sm:grid-cols-2 lg:grid-cols-5">
                    <div class="flex gap-3">
                        <Clock3 class="mt-0.5 h-4 w-4 shrink-0 text-purple" />
                        <div>
                            <p class="text-[11px] text-muted">Expérience</p>
                            <p class="mt-1 text-xs font-semibold">{{ store.candidate.experience }}</p>
                        </div>
                    </div>

                    <div class="flex gap-3">
                        <MapPin class="mt-0.5 h-4 w-4 shrink-0 text-purple" />
                        <div>
                            <p class="text-[11px] text-muted">Localisation</p>
                            <p class="mt-1 text-xs font-semibold">{{ store.candidate.localisation }}</p>
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <Phone class="mt-0.5 h-4 w-4 shrink-0 text-purple" />
                        <div>
                            <p class="text-[11px] text-muted">Téléphone</p>
                            <p class="mt-1 text-xs font-semibold">{{ store.candidate.telephone }}</p>
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <Mail class="mt-0.5 h-4 w-4 shrink-0 text-purple" />
                        <div class="min-w-0">
                            <p class="text-[11px] text-muted">Email</p>
                            <p class="mt-1 truncate text-xs font-semibold">{{ store.candidate.email }}</p>
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <CalendarDays class="mt-0.5 h-4 w-4 shrink-0 text-purple" />
                        <div>
                            <p class="text-[11px] text-muted">Date de candidature</p>
                            <p class="mt-1 text-xs font-semibold">{{ formatDate(store.candidate.dateCandidature) }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-4 grid gap-4 sm:grid-cols-2">
                <div class="rounded-lg border border-primary-blue/70 bg-white p-5 shadow-sm">
                    <div class="flex items-center gap-3">
                        <Clock3 class="h-5 w-5 text-purple" />
                        <h2 class="text-sm font-bold">Disponibilité</h2>
                    </div>
                    <p class="mt-5 text-[11px] text-muted">Disponibilité</p>
                    <p class="mt-1 text-sm font-semibold">{{ store.candidate.disponibilite }}</p>
                </div>
                <div class="rounded-lg border border-primary-blue/70 bg-white p-5 shadow-sm">
                    <div class="flex items-center gap-3"><Coins class="h-5 w-5 text-purple" />
                        <h2 class="text-sm font-bold">Salaire souhaité</h2>
                    </div>
                    <p class="mt-5 text-[11px] text-muted">Salaire souhaité</p>
                    <p class="mt-1 text-sm font-semibold">{{ store.candidate.salaireSouhaite.toLocaleString("fr-FR") }} €</p>
                </div>
            </div>

            <div class="mt-4 rounded-lg border border-primary-blue/70 bg-white p-5 shadow-sm">
                <div class="flex items-center gap-3">
                    <UserRound class="h-5 w-5 text-purple" />
                    <h2 class="text-sm font-bold">Compétences</h2>
                </div>
                <div class="mt-5 flex flex-wrap gap-3">
                    <span v-for="(value, index) in store.candidate.competences" :key="index" class="rounded-full bg-light-blue px-4 py-2 text-xs font-medium text-secondary">{{ value }}</span>
                </div>
            </div>

            <div class="mt-4 rounded-lg border border-primary-blue/70 bg-white p-5 shadow-sm">
                <div class="flex items-center gap-3"><FileText class="h-5 w-5 text-purple" />
                    <h2 class="text-sm font-bold">CV</h2>
                </div>
                <div class="mt-5 flex flex-col gap-4 rounded-lg bg-light-blue/70 p-3 sm:flex-row sm:items-center sm:justify-between">
                    <div class="flex items-center gap-3">
                        <FileText class="h-8 w-8 text-red-400" />
                        <div>
                            <p class="text-xs font-semibold text-secondary">CV_{{ store.candidate.nom.replaceAll(" ", "_") }}.pdf</p>
                            <p class="mt-1 text-[11px] text-muted">Document candidat</p>
                        </div>
                    </div>
                    <a :href="store.candidate.cv" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center gap-2 rounded-full border border-purple px-4 py-2 text-xs font-semibold text-purple hover:bg-purple/10"><Eye class="h-4 w-4" />Voir le CV</a>
                </div>
            </div>

            <div class="mt-4 rounded-lg border border-primary-blue/70 bg-white p-5 shadow-sm">
                <div class="flex items-center gap-3">
                    <FileText class="h-5 w-5 text-purple" />
                    <h2 class="text-sm font-bold">Lettre de motivation</h2>
                </div>
                <p class="mt-5 rounded-lg bg-light-blue/70 p-4 text-xs leading-6 text-secondary">{{ store.candidate.lettreMotivation }}</p>
            </div>

            <div class="mt-4 rounded-lg border border-primary-blue/70 bg-white p-5 shadow-sm">
                <div class="flex items-center gap-3">
                    <MessageCircle class="h-5 w-5 text-purple" />
                    <h2 class="text-sm font-bold">Commentaires</h2>
                </div>
                <div class="mt-5 space-y-2">
                    <div v-for="(comment, index) in store.candidate.commentaires" :key="index" class="rounded-lg bg-light-blue/70 p-3">
                        <div class="flex items-center gap-3">
                            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-purple/15 text-xs font-bold text-purple">{{ comment.auteur.slice(0, 2).toUpperCase() }}</span>
                            <div>
                                <p class="text-xs font-semibold">{{ comment.auteur }}</p><p class="text-[10px] text-muted">{{ formatDate(comment.date) }}</p>
                            </div>
                        </div>
                        <p class="mt-2 pl-11 text-xs leading-5 text-secondary">{{ comment.contenu }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>