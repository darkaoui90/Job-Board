-- database/schema.sql

CREATE DATABASE IF NOT EXISTS jobboard_db;
USE jobboard_db;

-- 1. Table Entreprise
CREATE TABLE IF NOT EXISTS entreprise (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    logo_url VARCHAR(255)
);

-- 2. Table Technologie
CREATE TABLE IF NOT EXISTS technologie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL UNIQUE
);

-- 3. Table Offre
CREATE TABLE IF NOT EXISTS offre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(150) NOT NULL,
    description_courte TEXT NOT NULL,
    description_longue TEXT,
    ville VARCHAR(100) NOT NULL,
    type_contrat ENUM('Stage', 'Alternance') NOT NULL,
    date_publication DATE NOT NULL,
    entreprise_id INT NOT NULL,
    FOREIGN KEY (entreprise_id) REFERENCES entreprise(id) ON DELETE CASCADE
);

-- 4. Table de liaison: Offre_Technologie (Many-to-Many)
CREATE TABLE IF NOT EXISTS offre_technologie (
    offre_id INT NOT NULL,
    technologie_id INT NOT NULL,
    PRIMARY KEY (offre_id, technologie_id),
    FOREIGN KEY (offre_id) REFERENCES offre(id) ON DELETE CASCADE,
    FOREIGN KEY (technologie_id) REFERENCES technologie(id) ON DELETE CASCADE
);