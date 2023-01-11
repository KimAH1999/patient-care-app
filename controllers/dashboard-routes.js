// import router, patient and authentication
const router = require('express').Router();
const { Patient } = require('../models/');
const withAuth = require('../utils/auth');

// list all patients onto the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const patientData = await Patient.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const posts = patientData.map((patient) => patient.get({ plain: true }));

    res.render('all-patients-admin', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

// new patient
router.get('/new', withAuth, (req, res) => {
  res.render('new-patient', {
    layout: 'dashboard',
  });
});

// edit specific patient id
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const patientData = await Patient.findByPk(req.params.id);

    if (patientData) {
      const post = patientData.get({ plain: true });

      res.render('edit-patient', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
