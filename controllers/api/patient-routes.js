// import router and patient model along with authentication
const router = require('express').Router();
const { Patient } = require('../../models/');
const withAuth = require('../../utils/auth');

// create a new Patient that belongs to the doctor who is logged in
router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newPatient = await Patient.create({ ...body, userId: req.session.userId });
    res.json(newPatient);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit an existing patient that the same doctor added
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Patient.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a patient that the same doctor added
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = Patient.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
