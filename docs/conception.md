# Conception du JobBoard

## Diagramme de classes UML

```mermaid
classDiagram
  class Entreprise {
    +int id
    +string nom
    +string logo_url
  }
  class Offre {
    +int id
    +string titre
    +text description_courte
    +text description_longue
    +string ville
    +enum type_contrat
    +date date_publication
    +int entreprise_id
  }
  class Technologie {
    +int id
    +string nom
  }
  Entreprise "1" --> "0..*" Offre : publie
  Offre "0..*" -- "0..*" Technologie : utilise
```

Une entreprise peut publier zéro ou plusieurs offres. Une offre appartient à une seule entreprise. Une offre peut utiliser plusieurs technologies et une technologie peut être liée à plusieurs offres.

## Diagramme de cas d'utilisation

```mermaid
flowchart LR
  V[Visiteur] --> L[Consulter les offres]
  V --> D[Voir le détail]
  V --> F[Rechercher, filtrer et trier]
  V --> S[Suivre une offre]
  A[Administrateur] --> C[Créer une offre]
  A --> M[Modifier une offre]
  A --> X[Supprimer une offre]
  A --> T[Associer des technologies]
```

## Modèle relationnel logique

- **entreprise** (**id**, nom, logo_url)
- **offre** (**id**, titre, description_courte, description_longue, ville, type_contrat, date_publication, *entreprise_id*)
- **technologie** (**id**, nom)
- **offre_technologie** (**offre_id**, **technologie_id**)

`offre.entreprise_id` référence `entreprise.id`. La clé primaire composée de `offre_technologie` évite de lier deux fois la même technologie à la même offre. Ses deux colonnes sont aussi des clés étrangères.

## Diagramme du flux d'affichage

```mermaid
sequenceDiagram
  actor Visiteur
  participant Route as Route Express
  participant Repo as offerRepository
  participant DB as MySQL
  participant Vue as Vue EJS
  Visiteur->>Route: GET /?ville=Paris
  Route->>Repo: getAll(filtres)
  Repo->>DB: SELECT ... WHERE ville = ?
  DB-->>Repo: lignes
  Repo-->>Route: offres
  Route->>Vue: render(index, offres)
  Vue-->>Visiteur: HTML
```

## Parcours de création

```mermaid
flowchart TD
  A[Ouvrir le formulaire] --> B[Remplir les champs]
  B --> C{Champs valides ?}
  C -- Non --> B
  C -- Oui --> D[Commencer une transaction]
  D --> E[Insérer l'offre]
  E --> F[Insérer les associations]
  F --> G[Valider la transaction]
  G --> H[Rediriger avec un message]
```

## Protection des requêtes

Les valeurs utilisateur ne sont jamais ajoutées directement dans une chaîne SQL. Les repositories utilisent des placeholders `?` et fournissent les valeurs séparément à `mysql2`. Le tri est limité dans le code à deux constantes, `ASC` ou `DESC`.
