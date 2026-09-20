# Document technique - Application de gestion des candidatures

## 1. Présentation

Cette application est une interface de gestion de candidatures développée avec Vue 3. Elle consomme les données d'un serveur REST local basé sur JSON Server et permet à un recruteur de consulter, rechercher, filtrer et mettre à jour les candidatures.

Les données ne sont pas codées en dur dans les composants Vue. Elles sont stockées dans `db.json` et récupérées via l'API REST.

## Architecture

```text
src/
├── App.vue
├── main.js
├── style.css
└── components/
		├── pagePrincipale.vue       # écran principal
		├── candidatures.vue         # tableau des candidatures
		├── candidatePage.vue        # détail d'une candidature
		├── status.vue               # statut modifiable
		├── filtre.vue               # menus de filtres
		├── searchBar.vue            # recherche avec debounce
		├── pagination.vue           # navigation entre les pages
		├── loadingState.vue         # état de chargement
		├── errorState.vue           # état d'erreur
		├── router/index.js          # routes Vue Router
		└── store.js/candidates.js   # store Pinia et appels API
```


## 3. Stratégie de communication avec l'API REST

L'application utilise l'API native `fetch`. La base de l'API est :

```js
const link = "http://localhost:3000"
```

### Endpoints utilisés

| Méthode | Endpoint | Utilisation |
| --- | --- | --- |
| `GET` | `/candidatures?_page=1&_per_page=5` | Liste paginée |
| `GET` | `/candidatures/:id` | Détail d'une candidature |
| `GET` | `/statuts` | Statuts et couleurs des badges |
| `GET` | `/competences` | Options du filtre compétences |
| `PATCH` | `/candidatures/:id` | Modification du statut |

### Chargement de la liste

La liste est chargée par `getCandidates()`. La requête contient la page courante et le nombre d'éléments par page :

```text
GET /candidatures?_page=1&_per_page=5
```

La version de JSON Server utilisée renvoie une réponse paginée de la forme :

```json
{
	"data": [],
	"pages": 1,
	"items": 0
}
```

Le store extrait `data.data` pour alimenter la liste, puis conserve `data.pages` et `data.items` pour la pagination.

### Recherche

La recherche est déclenchée après 500 ms sans nouvelle frappe. Cela évite de déclencher une action à chaque caractère saisi.

### Modification du statut

Lorsqu'un statut est sélectionné, l'application utilise :

```text
PATCH /candidatures/:id
Content-Type: application/json
```

avec un corps similaire à :

```json
{
	"statut": "Entretien RH"
}
```

## 4. Gestion de l'état et synchronisation

Pinia est utilisé comme store central avec `defineStore` et la syntaxe setup.

### État principal

Le store conserve notamment :

```js
const candidates = ref([])
const candidate = ref(null)
const status = ref([])
const skills = ref([])
const loading = ref(false)
const error = ref("")
const page = ref(1)
const totale = ref(0)
const totaleItems = ref(0)
```

### Synchronisation

1. Le composant appelle une action du store.
2. Le store exécute la requête HTTP.
3. La réponse JSON est convertie avec `response.json()`.
4. Les refs Pinia sont mises à jour.
5. Les composants utilisant ces refs sont automatiquement réactualisés.

Pour la page détail, l'ID est récupéré depuis la route `/candidature/:id` avec `useRoute()`. Un `watch` sur `route.params.id` recharge la candidature si l'utilisateur navigue directement d'un candidat à un autre.

Les états `loading` et `error` permettent d'afficher un loader, un message d'erreur et une action de réessai.

## 5. Décisions techniques

### Vue 3 et Composition API

La Composition API a été choisie pour organiser clairement la logique locale des composants avec `ref`, `watch` et `onMounted`.

### Pinia

Pinia évite de dupliquer les données entre les composants. La liste, le détail, les statuts et les compétences utilisent une source d'état commune.

### JSON Server

JSON Server fournit rapidement une API REST locale avec les opérations `GET` et `PATCH` nécessaires au test. Il permet aussi de persister les modifications dans `db.json`.

### Vue Router

Vue Router sépare l'écran de liste et la page détail :

```text
/                    Liste des candidatures
/candidature/:id     Détail d'une candidature
```

### Tailwind CSS

Tailwind permet de construire rapidement une interface responsive et de conserver une palette visuelle cohérente avec les couleurs de l'application.

## 6. Problèmes rencontrés et solutions

### Page blanche au démarrage

Plusieurs erreurs d'import et de références inexistantes pouvaient empêcher Vue de monter. Les imports du router, les alias Vite et les composants utilisés ont été vérifiés.



### Réponse paginée de JSON Server

La réponse n'était pas toujours un tableau direct. Le store doit tenir compte de la propriété `data` de la réponse paginée.

### Ancien statut affiché sur un autre candidat

Vue réutilise le composant lorsqu'un paramètre de route change. Le statut local du composant pouvait donc conserver l'ancienne valeur. Un watcher synchronise maintenant l'état local avec la prop reçue.


## 7. Points d'amélioration identifiés


- Désactiver les boutons précédent/suivant aux limites de pagination.
- Afficher un état vide lorsque la recherche ne retourne aucun candidat.
- Ajouter une notification après une mise à jour de statut.
- Afficher un format de date cohérent dans toutes les vues.
- Ajouter une confirmation avant une modification importante.


## 8. Vérification manuelle recommandée

1. Lancer JSON Server depuis le dossier contenant `db.json` :

	 ```bash
	 json-server --watch db.json --port 3000
	 ```

2. Dans un second terminal, lancer Vue :

	 ```bash
	 npm run dev
	 ```

3. Vérifier la liste, la pagination, la recherche et les filtres.
4. Ouvrir `/candidature/1` et vérifier le détail.
5. Modifier le statut et vérifier la modification dans `db.json`.
6. Arrêter JSON Server pour vérifier l'état d'erreur.
7. Recharger directement une URL de détail pour vérifier le chargement de l'ID depuis la route.
