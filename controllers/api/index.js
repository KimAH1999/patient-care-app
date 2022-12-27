const express = require('express')
const router = express.Router()

const userRoutes = require('./user-routes')
const providerRoutes = require('./provider-routes');
const patientRoutes = require('./patient-routes');

router.use('/user', userRoutes);
router.use('/provider', providerRoutes);
router.use('/patient', patientRoutes);

module.exports = router;
