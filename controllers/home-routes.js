const router = require('express').Router();
const { Patient, Doctor } = require('../models/');
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Patient.findAll({
      include: [Doctor],
    });

    const posts = postData.map((patient) => patient.get({ plain: true }));

    res.render('all-patients', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single patient
router.get('/patient/:id', async (req, res) => {
  try {
    const postData = await Patient.findByPk(req.params.id, {
      include: [Doctor],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('single-patient', {
        layout: 'main',
        post});
    } else {
      res.status(404).end();
    }
  } catch (err) {
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

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/symptoms', withAuth, (req, res) => {
  res.render('symptoms');
})

module.exports = router;
