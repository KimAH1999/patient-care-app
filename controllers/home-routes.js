const router = require('express').Router();
const { Provider } = require('../models');
const withAuth = require('../utils/auth');
//This instince home-routes is focused on Provider, but patient and user can still have their own login data
router.get('/', withAuth, async (req, res) => {
  try {
    const providerData = await Provider.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const providers = providerData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      providers,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
