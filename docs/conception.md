# Conception des Données

## Modèle Logique de Données (MLD)
* **Entreprise** (id_entreprise, nom, logo_url)
* **Technologie** (id_technologie, nom)
* **Offre** (id_offre, titre, description_courte, description_longue, ville, type_contrat, date_publication, #id_entreprise)
* **Offre_Technologie** (#id_offre, #id_technologie)

## Dictionnaire de Données simplifié
| Champ | Type | Contrainte | Table |
|---|---|---|---|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Toutes |
| nom | VARCHAR(100) | NOT NULL | Entreprise |
| titre | VARCHAR(150) | NOT NULL | Offre |
| ville | VARCHAR(100) | NOT NULL | Offre |
| type_contrat | ENUM | 'Stage' ou 'Alternance' | Offre |
| nom | VARCHAR(50) | NOT NULL, UNIQUE | Technologie |