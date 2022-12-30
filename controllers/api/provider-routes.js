const router = require('express').Router();
const { Provider } = require('../../models');
//Provider login router
router.post('/loginProvider', async (req, res) => {
    try {
      const providerData = await Provider.findOne({ where: { email: req.body.email } });
  
      if (!providerData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await providerData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.provider_id = providerData.id;
        req.session.logged_in = true;
        
        res.json({ provider: providerData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;
  