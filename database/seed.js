// database/seed.js
const mysql = require('mysql2/promise');
require('dotenv').config(); // This loads the passwords from your .env file

async function seedDatabase() {
  try {
    // 1. Connect to your Laragon MySQL
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log("⏳ Connexion réussie ! Nettoyage des anciennes données...");
    
    // Clear out old data just in case you run this twice
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('TRUNCATE TABLE offre_technologie');
    await connection.query('TRUNCATE TABLE offre');
    await connection.query('TRUNCATE TABLE technologie');
    await connection.query('TRUNCATE TABLE entreprise');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log("🏢 Ajout des 5 entreprises...");
    await connection.query(`
      INSERT INTO entreprise (id, nom) VALUES 
      (1, 'Scaleway'), (2, 'Doctolib'), (3, 'Malt'), (4, 'PayFit'), (5, 'Swile')
    `);

    console.log("💻 Ajout des 8 technologies...");
    await connection.query(`
      INSERT INTO technologie (id, nom) VALUES 
      (1, 'React'), (2, 'Node.js'), (3, 'MySQL'), (4, 'PHP'), 
      (5, 'Symfony'), (6, 'Vue.js'), (7, 'Python'), (8, 'Docker')
    `);

    console.log("📝 Ajout des 12 offres...");
    await connection.query(`
      INSERT INTO offre (id, titre, description_courte, ville, type_contrat, date_publication, entreprise_id) VALUES 
      (1, 'Développeur Fullstack', 'Poste complet MERN', 'Paris', 'Alternance', '2026-09-20', 1),
      (2, 'Développeur Frontend', 'Rejoignez notre équipe UI', 'Lyon', 'Stage', '2026-09-21', 2),
      (3, 'Développeur Backend', 'API et microservices', 'Nantes', 'Alternance', '2026-09-18', 3),
      (4, 'Tech Lead', 'Management et code', 'Paris', 'Alternance', '2026-09-19', 4),
      (5, 'Développeur React', 'Composants dynamiques', 'Bordeaux', 'Stage', '2026-09-22', 5),
      (6, 'DevOps Junior', 'CI/CD et Cloud', 'Lille', 'Alternance', '2026-09-10', 1),
      (7, 'Développeur PHP', 'Migration vers Symfony', 'Lyon', 'Stage', '2026-09-15', 2),
      (8, 'Intégrateur Web', 'HTML/CSS avancé', 'Paris', 'Alternance', '2026-09-16', 3),
      (9, 'Développeur Node', 'Optimisation serveur', 'Toulouse', 'Stage', '2026-09-17', 4),
      (10, 'Data Engineer', 'Pipelines de données', 'Paris', 'Alternance', '2026-09-18', 5),
      (11, 'Développeur Vue.js', 'Interface utilisateur', 'Nantes', 'Stage', '2026-09-19', 1),
      (12, 'Architecte Logiciel', 'Conception système', 'Lyon', 'Alternance', '2026-09-20', 2)
    `);

    console.log("🔗 Ajout des liaisons Offre-Technologie...");
    await connection.query(`
      INSERT INTO offre_technologie (offre_id, technologie_id) VALUES 
      (1, 1), (1, 2), (1, 3), (2, 1), (3, 2), (3, 3), (4, 1), (4, 8), 
      (5, 1), (6, 8), (7, 4), (7, 5), (8, 6), (9, 2), (10, 7), 
      (11, 6), (12, 2), (12, 8)
    `);

    console.log("✅ Seed terminé avec succès ! Ta base de données est prête.");
    connection.end();

  } catch (error) {
    console.error("❌ Erreur lors du seed :", error);
  }
}

seedDatabase();