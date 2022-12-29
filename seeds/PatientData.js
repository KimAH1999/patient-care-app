const { Patient } = require('../models');

const Patientdata = [
  {
    patient_name: 'Ashley Timithy',
    email: 'ashley@fakeemail.com',
    password: 'realPassword234',
  },
];

const seedPatients = () => Patient.bulkCreate(Patientdata);

module.exports = seedPatients;
