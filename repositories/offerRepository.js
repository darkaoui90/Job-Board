const pool = require('../config/database');

const offerFields = `
  SELECT offre.*, entreprise.nom AS nom_entreprise,
  GROUP_CONCAT(DISTINCT technologie.nom ORDER BY technologie.nom SEPARATOR ', ') AS technologies
  FROM offre
  JOIN entreprise ON entreprise.id = offre.entreprise_id
  LEFT JOIN offre_technologie ON offre_technologie.offre_id = offre.id
  LEFT JOIN technologie ON technologie.id = offre_technologie.technologie_id
`;

async function getAll(filters) {
  let sql = offerFields + ' WHERE 1 = 1';
  const values = [];
  if (filters.q) {
    sql += ` AND (
      offre.titre LIKE ? OR offre.description_courte LIKE ?
      OR offre.description_longue LIKE ? OR entreprise.nom LIKE ?
      OR technologie.nom LIKE ?
    )`;
    const word = '%' + filters.q + '%';
    values.push(word, word, word, word, word);
  }
  if (filters.ville) {
    sql += ' AND offre.ville = ?';
    values.push(filters.ville);
  }
  if (filters.contrat) {
    sql += ' AND offre.type_contrat = ?';
    values.push(filters.contrat);
  }
  if (filters.technologie) {
    sql += ` AND EXISTS (
      SELECT 1 FROM offre_technologie filtre_ot
      WHERE filtre_ot.offre_id = offre.id AND filtre_ot.technologie_id = ?
    )`;
    values.push(filters.technologie);
  }
  const direction = filters.tri === 'ancien' ? 'ASC' : 'DESC';
  sql += ` GROUP BY offre.id ORDER BY offre.date_publication ${direction}, offre.id ${direction}`;
  const [offers] = await pool.query(sql, values);
  return offers;
}

async function getById(id) {
  const sql = offerFields + ' WHERE offre.id = ? GROUP BY offre.id';
  const [offers] = await pool.query(sql, [id]);
  return offers[0];
}

async function create(data, technologyIds) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [result] = await connection.query(
      `INSERT INTO offre
      (titre, description_courte, description_longue, ville, type_contrat, date_publication, entreprise_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [data.titre, data.description_courte, data.description_longue, data.ville,
        data.type_contrat, data.date_publication, data.entreprise_id]
    );
    for (const technologyId of technologyIds) {
      await connection.query(
        'INSERT INTO offre_technologie (offre_id, technologie_id) VALUES (?, ?)',
        [result.insertId, technologyId]
      );
    }
    await connection.commit();
    return result.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function update(id, data, technologyIds) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query(
      `UPDATE offre SET titre = ?, description_courte = ?, description_longue = ?,
      ville = ?, type_contrat = ?, date_publication = ?, entreprise_id = ? WHERE id = ?`,
      [data.titre, data.description_courte, data.description_longue, data.ville,
        data.type_contrat, data.date_publication, data.entreprise_id, id]
    );
    await connection.query('DELETE FROM offre_technologie WHERE offre_id = ?', [id]);
    for (const technologyId of technologyIds) {
      await connection.query(
        'INSERT INTO offre_technologie (offre_id, technologie_id) VALUES (?, ?)',
        [id, technologyId]
      );
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function remove(id) {
  await pool.query('DELETE FROM offre WHERE id = ?', [id]);
}

async function getTechnologyIds(offerId) {
  const [rows] = await pool.query(
    'SELECT technologie_id FROM offre_technologie WHERE offre_id = ?',
    [offerId]
  );
  return rows.map(function (row) {
    return row.technologie_id;
  });
}

module.exports = { getAll, getById, create, update, remove, getTechnologyIds };
