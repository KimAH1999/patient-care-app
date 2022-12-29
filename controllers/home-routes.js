const router = require('express').Router();
const { Provider, Patient } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbProviderData = await Provider.findAll({
      include: [
        {
          model: Patient,
          attributes: ['filename', 'description'],
        },
      ],
    });

    const Providers = dbProviderData.map((Provider) =>
      Provider.get({ plain: true })
    );

    res.render('homepage', {
      galleries,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Provider
// Use the custom middleware before allowing the user to access the Provider
router.get('/Provider/:id', withAuth, async (req, res) => {
  try {
    const dbProviderData = await Provider.findByPk(req.params.id, {
      include: [
        {
          model: Patient,
          attributes: ['id','name','checkin_date','filename','description'],
        },
      ],
    });

    const Provider = dbProviderData.get({ plain: true });
    res.render('Provider', { Provider, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Patient
// Use the custom middleware before allowing the user to access the Patient
router.get('/Patient/:id', withAuth, async (req, res) => {
  try {
    const dbPatientData = await Patient.findByPk(req.params.id);
    const Patient = dbPatientData.get({ plain: true });

    res.render('Patient', { Patient, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
