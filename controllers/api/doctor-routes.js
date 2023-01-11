// import Router and Doctor model
const router = require('express').Router();
const { Doctor } = require('../../models');

// create a new doctor account
router.post('/', async (req, res) => {
  try {
    const newDoctor = await Doctor.create({
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });

    req.session.save(() => {
      req.session.userId = newDoctor.id;
      req.session.username = newDoctor.username;
      req.session.loggedIn = true;

      res.json(newDoctor);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// log into an existing Doctor account
router.post('/login', async (req, res) => {
  try {
    const user = await Doctor.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

// logout of your doctor account
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
