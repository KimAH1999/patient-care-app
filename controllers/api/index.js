const router = require('express').Router();
const userRoutes = require('./user-routes')
const providerRoutes = require('./provider-routes');
const patientRoutes = required('./patient-routes');

router.use('/user', userRoutes);
router.use('/provider', providerRoutes);
router.use('/patient', patientRoutes);

module.exports = router;
