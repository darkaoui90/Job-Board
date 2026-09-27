require('dotenv').config();

const express = require('express');
const path = require('path');
const offerRepository = require('./repositories/offerRepository');
const referenceRepository = require('./repositories/referenceRepository');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

function getFilters(query) {
  return {
    q: query.q || '',
    ville: query.ville || '',
    contrat: query.contrat || '',
    technologie: query.technologie || '',
    tri: query.tri === 'ancien' ? 'ancien' : 'recent'
  };
}

function getTechnologyIds(body) {
  if (!body.technologies) return [];
  const ids = Array.isArray(body.technologies) ? body.technologies : [body.technologies];
  return ids.map(Number).filter(Number.isInteger);
}

function validateOffer(body) {
  const required = ['titre', 'description_courte', 'ville', 'type_contrat', 'date_publication', 'entreprise_id'];
  return required.every(function (field) {
    return body[field] && String(body[field]).trim() !== '';
  }) && ['Stage', 'Alternance'].includes(body.type_contrat);
}

app.get('/', async function (req, res, next) {
  try {
    const filters = getFilters(req.query);
    const [offers, cities, technologies] = await Promise.all([
      offerRepository.getAll(filters),
      referenceRepository.getCities(),
      referenceRepository.getTechnologies()
    ]);
    res.render('index', { page: 'offers', offers, cities, technologies, filters });
  } catch (error) {
    next(error);
  }
});

app.get('/offres/:id', async function (req, res, next) {
  try {
    const offer = await offerRepository.getById(req.params.id);
    if (!offer) return res.status(404).render('404', { page: '' });
    res.render('offer-detail', { page: 'offers', offer });
  } catch (error) {
    next(error);
  }
});

app.get('/suivies', async function (req, res, next) {
  try {
    const offers = await offerRepository.getAll({ tri: 'recent' });
    res.render('followed', { page: 'followed', offers });
  } catch (error) {
    next(error);
  }
});

app.get('/admin/offres', async function (req, res, next) {
  try {
    const offers = await offerRepository.getAll({ tri: 'recent' });
    res.render('admin/index', { page: 'admin', offers, message: req.query.message || '' });
  } catch (error) {
    next(error);
  }
});

app.get('/admin/offres/nouvelle', showOfferForm);

app.post('/admin/offres', async function (req, res, next) {
  if (!validateOffer(req.body)) {
    req.formError = 'Merci de remplir tous les champs obligatoires.';
    return showOfferForm(req, res, next);
  }
  try {
    await offerRepository.create(req.body, getTechnologyIds(req.body));
    res.redirect('/admin/offres?message=Offre créée avec succès');
  } catch (error) {
    next(error);
  }
});

app.get('/admin/offres/:id/modifier', async function (req, res, next) {
  try {
    const offer = await offerRepository.getById(req.params.id);
    if (!offer) return res.status(404).render('404', { page: 'admin' });
    offer.technologyIds = await offerRepository.getTechnologyIds(req.params.id);
    const [companies, technologies] = await Promise.all([
      referenceRepository.getCompanies(),
      referenceRepository.getTechnologies()
    ]);
    res.render('admin/form', { page: 'admin', offer, companies, technologies, error: '' });
  } catch (error) {
    next(error);
  }
});

app.post('/admin/offres/:id/modifier', async function (req, res, next) {
  if (!validateOffer(req.body)) {
    req.formError = 'Merci de remplir tous les champs obligatoires.';
    return showOfferForm(req, res, next);
  }
  try {
    await offerRepository.update(req.params.id, req.body, getTechnologyIds(req.body));
    res.redirect('/admin/offres?message=Offre modifiée avec succès');
  } catch (error) {
    next(error);
  }
});

app.post('/admin/offres/:id/supprimer', async function (req, res, next) {
  try {
    await offerRepository.remove(req.params.id);
    res.redirect('/admin/offres?message=Offre supprimée avec succès');
  } catch (error) {
    next(error);
  }
});

async function showOfferForm(req, res, next) {
  try {
    const error = req.formError || '';
    let offer = {
      titre: '', description_courte: '', description_longue: '', ville: '',
      type_contrat: 'Stage', date_publication: new Date().toISOString().slice(0, 10),
      entreprise_id: '', technologyIds: []
    };
    if (req.body && Object.keys(req.body).length > 0) {
      offer = Object.assign(offer, req.body);
      offer.id = req.params.id;
      offer.technologyIds = getTechnologyIds(req.body);
    }
    const [companies, technologies] = await Promise.all([
      referenceRepository.getCompanies(),
      referenceRepository.getTechnologies()
    ]);
    res.status(error ? 400 : 200).render('admin/form', {
      page: 'admin', offer, companies, technologies, error: error || ''
    });
  } catch (formError) {
    next(formError);
  }
}

app.use(function (req, res) {
  res.status(404).render('404', { page: '' });
});

app.use(function (error, req, res, next) {
  console.error(error);
  res.status(500).render('500', { page: '', error });
});

app.listen(port, function () {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
