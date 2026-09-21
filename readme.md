# JobBoard — Stages & Alternances

Application dynamique responsive d'un portail de stages et d'alternances. Le projet charge les offres depuis un fichier JSON puis les affiche, filtre, trie et sauvegarde côté navigateur.

## Pages

- `index.html` : liste dynamique, recherche, filtres, tri et favoris.
- `offre-detail.html` : détail d'une offre.
- `deposer-offre.html` : dépôt statique.
- `offres-suivies.html` : offres suivies sauvegardées dans le navigateur.
- `admin.html` : back-office minimal.

## Lancement

Aucune installation n'est nécessaire. L'application doit être lancée avec un serveur local car `fetch()` ne peut pas charger correctement le fichier JSON depuis `file://`.

Depuis la racine du projet :

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000` dans le navigateur.

## Fonctionnement JavaScript

- `data/offers.json` contient les 12 offres utilisées par l'application.
- `js/data.js` utilise `fetch()` et `async/await` pour charger les données.
- `js/app.js` applique la recherche, les filtres combinables et le tri par date avant de demander à `js/render.js` de créer les cartes dans le DOM.
- `js/storage.js` utilise `localStorage`, `JSON.stringify()` et `JSON.parse()` pour conserver uniquement les identifiants des offres suivies.
- `js/followed.js` recharge le JSON, retrouve les identifiants sauvegardés et affiche les offres suivies sur `offres-suivies.html`.

Les favoris sont conservés sous la clé `followedOffers`. Exemple de valeur stockée :

```json
[2, 7, 10]
```

Supprimer un favori ou utiliser « Tout effacer » met immédiatement à jour `localStorage` et le compteur affiché.

## Documentation

- [Analyse du cahier des charges](docs/analyse-cahier-des-charges.md)
- [Backlog Jira](docs/jira-export.md)
- [Maquettes Figma](docs/figma-link.md)

## Technique et périmètre

HTML5 sémantique, CSS natif avec variables, Flexbox, Grid et media queries, et JavaScript natif avec modules ES. Ce brief n'inclut ni authentification, backend, base de données, API, upload, paiement ou framework front-end.

## Branches

- `main` : version stable.
- `brief-1/project-docs` : cadrage et documentation.
- `brief-1/public-pages` : écrans publics.
- `brief-1/forms-responsive` : formulaires et responsive.

## État

- [x] Analyse, utilisateurs, parcours, arborescence et backlog cible
- [x] Liens Jira et Figma
- [x] Liste, détail, dépôt, suivies et back-office
- [x] Navigation responsive
- [x] Chargement JSON, rendu dynamique, recherche, filtres et tri
- [x] Offres suivies avec `localStorage`
- [ ] Express/EJS/MySQL (brief ultérieur)
