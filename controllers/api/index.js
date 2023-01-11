const router = require('express').Router();

const doctorRoutes = require('./doctor-routes');
const patientRoutes = require('./patient-routes');

router.use('/doctor', doctorRoutes);
router.use('/patient', patientRoutes);

module.exports = router;