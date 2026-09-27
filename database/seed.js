const mysql = require('mysql2/promise');
require('dotenv').config();

async function seedDatabase() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('Connexion à MySQL...');
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('TRUNCATE TABLE offre_technologie');
    await connection.query('TRUNCATE TABLE offre');
    await connection.query('TRUNCATE TABLE technologie');
    await connection.query('TRUNCATE TABLE entreprise');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    const companies = ['Scaleway', 'Doctolib', 'Malt', 'PayFit', 'Swile'];
    for (const company of companies) {
      await connection.query('INSERT INTO entreprise (nom) VALUES (?)', [company]);
    }
    console.log('5 entreprises ajoutées.');

    const technologies = ['React', 'Node.js', 'MySQL', 'PHP', 'Symfony', 'Vue.js', 'Python', 'Docker'];
    for (const technology of technologies) {
      await connection.query('INSERT INTO technologie (nom) VALUES (?)', [technology]);
    }
    console.log('8 technologies ajoutées.');

    const offers = [
      ['Développeur Fullstack', 'Construire une application React et Node.js.', 'Vous participerez à toutes les étapes du développement avec une équipe expérimentée.', 'Paris', 'Alternance', '2026-09-20', 1],
      ['Développeur Frontend', 'Créer des interfaces simples et accessibles.', 'Vous développerez des composants React et collaborerez avec les designers.', 'Lyon', 'Stage', '2026-09-21', 2],
      ['Développeur Backend', 'Développer des services Node.js et MySQL.', 'Vous réaliserez les routes serveur et améliorerez les requêtes SQL.', 'Nantes', 'Alternance', '2026-09-18', 3],
      ['Tech Lead Junior', 'Accompagner une petite équipe produit.', 'Vous aiderez à organiser le code et à relire les développements.', 'Paris', 'Alternance', '2026-09-19', 4],
      ['Développeur React', 'Créer des composants dynamiques.', 'Vous intégrerez les maquettes et connecterez les pages au backend.', 'Bordeaux', 'Stage', '2026-09-22', 5],
      ['DevOps Junior', 'Automatiser les déploiements.', 'Vous travaillerez sur Docker et les outils d’intégration continue.', 'Lille', 'Alternance', '2026-09-10', 1],
      ['Développeur PHP', 'Participer à une migration Symfony.', 'Vous corrigerez et développerez des fonctionnalités métier.', 'Lyon', 'Stage', '2026-09-15', 2],
      ['Intégrateur Web', 'Intégrer des pages responsives.', 'Vous transformerez les maquettes en pages accessibles et responsives.', 'Paris', 'Alternance', '2026-09-16', 3],
      ['Développeur Node.js', 'Optimiser une application serveur.', 'Vous améliorerez les performances et ajouterez des tests simples.', 'Toulouse', 'Stage', '2026-09-17', 4],
      ['Data Engineer', 'Construire des pipelines de données.', 'Vous préparerez et contrôlerez les données utilisées par les équipes.', 'Paris', 'Alternance', '2026-09-18', 5],
      ['Développeur Vue.js', 'Faire évoluer une interface utilisateur.', 'Vous créerez des pages Vue.js et corrigerez les problèmes remontés.', 'Nantes', 'Stage', '2026-09-19', 1],
      ['Architecte Logiciel Junior', 'Participer à la conception technique.', 'Vous documenterez les choix techniques et réaliserez des prototypes.', 'Lyon', 'Alternance', '2026-09-20', 2]
    ];

    for (const offer of offers) {
      await connection.query(
        `INSERT INTO offre
        (titre, description_courte, description_longue, ville, type_contrat, date_publication, entreprise_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        offer
      );
    }
    console.log('12 offres ajoutées.');

    const links = [
      [1, 1], [1, 2], [1, 3], [2, 1], [3, 2], [3, 3],
      [4, 1], [4, 8], [5, 1], [6, 8], [7, 4], [7, 5],
      [8, 6], [9, 2], [10, 7], [11, 6], [12, 2], [12, 8]
    ];
    for (const link of links) {
      await connection.query(
        'INSERT INTO offre_technologie (offre_id, technologie_id) VALUES (?, ?)',
        link
      );
    }
    console.log('Associations offre-technologie ajoutées.');
    console.log('Seed terminé avec succès.');
  } catch (error) {
    console.error('Erreur pendant le seed :', error.message);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
}

if (require.main === module) {
  seedDatabase().catch(function () {
    process.exitCode = 1;
  });
}

module.exports = seedDatabase;
