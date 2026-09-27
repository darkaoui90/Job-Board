const pool = require('../config/database');

async function getCompanies() {
  const [companies] = await pool.query('SELECT id, nom FROM entreprise ORDER BY nom');
  return companies;
}

async function getTechnologies() {
  const [technologies] = await pool.query('SELECT id, nom FROM technologie ORDER BY nom');
  return technologies;
}

async function getCities() {
  const [cities] = await pool.query('SELECT DISTINCT ville FROM offre ORDER BY ville');
  return cities.map(function (city) {
    return city.ville;
  });
}

module.exports = { getCompanies, getTechnologies, getCities };
