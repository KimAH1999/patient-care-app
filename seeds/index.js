const sequelize = require('../config/connection');
const {Patient, Provider} = require('../models');

const patientData = require('./patientData.json');
const providerData = require('./providerData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await Patient.bulkCreate(patientData, {
        individualHooks: true,
        returning: true,
    });

    await Provider.bulkCreate(providerData, {
        individualHooks: true,
        returning: true,
      });

    process.exit(0);
};

seedAll();