const router = require('express').Router();
const { Patient } = require('../../models');
//Patient login router
router.post('/login', async (req, res) => {
    try {
      const patientData = await Patient.findOne({ where: { email: req.body.email } });
  
      if (!patientData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await patientData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.patient_id = patientData.id;
        req.session.logged_in = true;
        
        res.json({ patient: patientData, message: 'You are now logged in!' });
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
  