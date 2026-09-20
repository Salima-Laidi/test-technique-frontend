import { createRouter, createWebHistory } from "vue-router"

import PagePrincipal from "../pagePrincipale.vue"
import CandidatePage from "../candidatePage.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: PagePrincipal 
        },
        {
            path: "/candidature/:id",
            component: CandidatePage
        }
    ]
})

export default router