const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const seedDatabase = require('./seed');
require('dotenv').config();

async function resetDatabase() {
  let connection;

  try {
    const databaseName = process.env.DB_NAME;
    if (!databaseName || !/^[a-zA-Z0-9_]+$/.test(databaseName)) {
      throw new Error('DB_NAME doit contenir uniquement des lettres, chiffres ou underscores.');
    }

    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true
    });

    console.log('Recr‚ation de la base de donn‚es...');
    await connection.query('DROP DATABASE IF EXISTS ??', [databaseName]);
    await connection.query('CREATE DATABASE ?? CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci', [databaseName]);
    await connection.query('USE ??', [databaseName]);

    const schemaPath = path.join(__dirname, 'schema.sql');
    let schema = fs.readFileSync(schemaPath, 'utf8');
    schema = schema
      .replace(/CREATE DATABASE IF NOT EXISTS jobboard_db;/i, '')
      .replace(/USE jobboard_db;/i, '');
    await connection.query(schema);
    await connection.end();
    connection = null;

    console.log('Sch‚ma cr‚‚. Lancement du seeder...');
    await seedDatabase();
    console.log('Base r‚initialis‚e avec succŠs.');
  } catch (error) {
    console.error('Erreur pendant le reset :', error.message);
    process.exitCode = 1;
  } finally {
    if (connection) await connection.end();
  }
}

resetDatabase();
