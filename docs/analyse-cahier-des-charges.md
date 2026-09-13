# Analyse du cahier des charges — JobBoard

## 1. Reformulation du besoin

Le produit est un portail responsive qui centralise des offres de stage et d'alternance. Le candidat découvre, consulte et suit des opportunités. Le recruteur prépare le dépôt d'une offre. L'administrateur dispose d'une vue minimale de modération. Le brief livre le cadrage, le backlog, les maquettes et les écrans statiques servant de base aux futurs briefs JavaScript puis Express/EJS/MySQL.

## 2. Utilisateurs et parcours

| Utilisateur | Objectif | Parcours |
| --- | --- | --- |
| Candidat | Trouver une offre | Liste → filtres prévus → détail → offre suivie |
| Recruteur | Publier une opportunité | Dépôt → formulaire → confirmation future |
| Administrateur | Contrôler les publications | Back-office → consultation → validation/refus futurs |

L'authentification, la persistance, l'API, l'e-mail et l'upload sont hors périmètre.

## 3. Périmètre

- Liste avec recherche, filtres et tri préparés visuellement.
- Détail avec entreprise, contrat, compétences et appel à l'action.
- Dépôt d'offre et offres suivies statiques.
- Back-office minimal et navigation cohérente.
- Responsive mobile, tablette et desktop en HTML/CSS sémantique.

## 4. Arborescence

```text
Accueil / Liste des offres
├── Détail d'une offre
├── Offres suivies
├── Déposer une offre
└── Administration
```

## 5. Backlog cible

### Epic 1 — Expérience statique HTML/CSS

1. En tant que candidat, je veux consulter la liste afin d'identifier des opportunités.
   - Chaque carte affiche titre, entreprise, lieu, contrat et technologies.
   - Chaque carte mène au détail.
2. En tant que candidat, je veux consulter le détail afin d'évaluer une offre.
   - Missions, prérequis et contrat sont visibles.
   - Le retour à la liste est disponible.
3. En tant que recruteur, je veux remplir un dépôt afin de préparer une publication.
   - Les champs obligatoires et leurs labels sont explicites.
4. En tant que candidat, je veux consulter mes offres suivies afin de retrouver ma sélection.
   - Chaque élément affiche un statut et un lien de détail.

### Epic 2 — Dynamisation JavaScript

5. En tant que candidat, je veux rechercher par mot-clé afin de réduire la liste.
   - Le résultat évolue sans rechargement et prévoit un état vide.
6. En tant que candidat, je veux combiner contrat, ville et technologie afin d'affiner la recherche.
   - Les filtres sont combinables et réinitialisables.
7. En tant que candidat, je veux ajouter ou retirer un favori afin de gérer ma sélection.
   - L'état est conservé localement.

### Epic 3 — Fullstack Express/EJS/MySQL

8. En tant que recruteur, je veux enregistrer une offre afin de la soumettre.
   - Les données valides sont persistées et les erreurs expliquées.
9. En tant qu'administrateur, je veux valider ou refuser une offre afin de modérer les publications.
   - Seules les offres validées sont publiques.
10. En tant que candidat, je veux retrouver mes favoris persistés afin de conserver mon suivi.
    - La sélection est restituée sans doublon.

Tâches techniques : définir les composants CSS, structurer les données d'offre, prévoir les états vide/erreur/succès, concevoir le schéma MySQL, préparer routes Express et vues EJS, ajouter validation, tests et audit d'accessibilité.

Priorité recommandée : stories 1–4 **Must**, 5–7 **Should**, 8–10 **Could** pour ce sprint de cadrage.

## 6. Definition of Done

Une story est terminée lorsque ses critères sont satisfaits, la page est navigable, le HTML est sémantique, le rendu reste lisible dès 320 px, le clavier dispose d'un focus visible, les libellés accessibles sont présents, aucune action statique n'est présentée comme persistante et le code relu est commité explicitement.

## 7. Planning prévisionnel

| Jour | Livrable |
| --- | --- |
| J1 | Analyse, parcours, epics et stories |
| J2 | Arborescence, wireframes et composants Figma |
| J3 | Maquettes desktop/mobile et liste |
| J4 | Détail, dépôt, suivies et administration |
| J5 | Responsive, accessibilité, recette et présentation |

## 8. Préparation des briefs suivants

Les noms et identifiants des contrôles préparent JavaScript. Les données HTML deviendront des objets puis des enregistrements MySQL. Les favoris pourront passer par `localStorage` avant la base. Le formulaire recevra validation client puis serveur sans changer son organisation visuelle.

## 9. Recette

Les cinq écrans s'ouvrent sans build, tous les liens ciblent un fichier existant, la grille et les formulaires s'adaptent aux trois formats, les liens Jira/Figma sont documentés et l'historique Git reste lisible par fonctionnalité.
