# JobBoard — Stages & Alternances

Application full-stack simple réalisée avec Node.js, Express, EJS et MySQL. Les visiteurs peuvent rechercher, filtrer, trier et suivre des offres. L'administration permet de créer, modifier et supprimer les offres ainsi que leurs technologies.

## Prérequis

- Node.js 18 ou plus récent
- MySQL 8 (MySQL de Laragon convient)
- npm

## Installation

1. Cloner le dépôt puis ouvrir un terminal dans le dossier.
2. Installer les dépendances :

```bash
npm install
```

3. Copier `.env.example` vers `.env` et adapter les identifiants MySQL :

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=jobboard_db
```

4. Créer une base propre, ses tables et les données de démonstration :

```bash
npm run db:reset
```

5. Démarrer l'application :

```bash
npm run dev
```

Ouvrir ensuite http://localhost:3000.

## Scripts npm

- `npm start` : démarre le serveur avec Node.js.
- `npm run dev` : démarre le serveur avec redémarrage automatique.
- `npm run db:seed` : vide les quatre tables puis insère 5 entreprises, 8 technologies et 12 offres.
- `npm run db:reset` : supprime et recrée la base indiquée par `DB_NAME`, exécute `database/schema.sql`, puis lance le seeder. Attention : les données de cette base sont supprimées.

## Fonctionnalités

### Partie publique

- liste des offres provenant de MySQL ;
- détail d'une offre ;
- recherche par titre, description, entreprise ou technologie ;
- filtres par ville, contrat et technologie ;
- tri par date, du plus récent au plus ancien ou l'inverse ;
- offres suivies dans `localStorage`.

### Administration

- liste de toutes les offres ;
- création et modification avec entreprise et technologies ;
- suppression avec confirmation ;
- messages après les opérations.

Le brief ne demande pas d'authentification : les routes `/admin/offres` sont donc volontairement publiques.

## Organisation

```text
config/                 connexion MySQL partagée
repositories/           requêtes SQL
views/                   pages et partials EJS
public/                  CSS et JavaScript navigateur
database/schema.sql      structure relationnelle
database/seed.js         données de démonstration
database/reset.js        recréation complète
docs/conception.md       diagrammes et modèle logique
server.js                routes Express
```

Le flux principal est : route Express → repository → MySQL → vue EJS. Les valeurs reçues dans les formulaires et les filtres sont envoyées à MySQL avec des placeholders `?`. Le sens du tri n'est pas une valeur SQL libre : il est choisi entre `ASC` et `DESC` dans le code.

## Routes principales

| Méthode | URL | Rôle |
|---|---|---|
| GET | `/` | liste, recherche, filtres et tri |
| GET | `/offres/:id` | détail |
| GET | `/suivies` | favoris du navigateur |
| GET | `/admin/offres` | liste d'administration |
| GET/POST | `/admin/offres/nouvelle`, `/admin/offres` | formulaire et création |
| GET/POST | `/admin/offres/:id/modifier` | formulaire et modification |
| POST | `/admin/offres/:id/supprimer` | suppression |

## Documentation

- [Conception et diagrammes](docs/conception.md)
- [Analyse du cahier des charges](docs/analyse-cahier-des-charges.md)
- [Backlog Jira](docs/jira-export.md)
- [Lien Figma](docs/figma-link.md)
